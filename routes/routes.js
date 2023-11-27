const express = require("express");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const User = require("../models/userModel");
const Venue = require("../models/venueModel");

router.get("/", (req, res) => {
  res.render("home");
});

const isLoggedIn = (req, res, next) => {
  if (req.session.isAuth) return next();
  res.render("login");
};


router.get("/register", (req, res) => {
  if(req.session.isAuth){
    res.redirect("/");
  }
  res.render("register");
});

router.post("/register", async (req, res) => {
  const { firstName, lastName, phoneNo, emailID, password } = req.body;

  let user = await User.findOne({ $or: [{ emailID }, { phoneNo }] });

  if (user) {
    let msg = "User Already Exists!!";
    return res.render("register", { error: msg });
  }

  const hashedPswd = await bcrypt.hash(password, 12);
  try {
    // user = await User.create({
    //     firstName,
    //     lastName,
    //     phoneNo,
    //     emailID,
    //     password: hashedPswd,
    // });

    user = new User({
      firstName,
      lastName,
      phoneNo,
      emailID,
      password: hashedPswd,
    });

    await user.save();

    res.redirect("/");
  } catch (error) {
    res.render("/register");
    res.status(400).json({ message: error.message });
  }
});

router.get("/login", isLoggedIn, (req, res) => {
  res.redirect("/");
});

router.post("/login", async (req, res) => {
  try {
    const foundUser = await User.findOne({ emailID: req.body.emailID });

    if (foundUser) {
      const passwordMatch = await bcrypt.compare(
        req.body.password,
        foundUser.password
      );

      if (passwordMatch) {
        req.session.isAuth = true;
        req.session.user = {
          id: foundUser._id,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          // Add other user details as needed
        };
        req.session.isAuth = true;
        res.redirect(`/myprofile`);
      } else {
        res.redirect("/login");
      }
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Unable to logout" });
    }
    res.redirect("/");
  });
});

// ===================================================================

// myprofile route
router.get("/myprofile", isLoggedIn, (req, res) => {
  // If logged In
  res.render("myprofile", { user: req.session.user });
});

router.get("/myprofile/bookings", isLoggedIn, (req, res) => {
  res.render("bookings");
});

router.get("/myprofile/edit", isLoggedIn, (req, res) => {
  res.send("Edit Your Profile");
});

router.post("/myprofile/edit", isLoggedIn, (req, res) => {
  // Update the details of the user
  res.send("Your Profile has been updated");
});

router.get("/myprofile/feedback", isLoggedIn, (req, res) => {
  res.render("feedback");
  //   res.send("Your feedback matters to us a lot");
});


// =======================================================================

router.get("/book", (req, res) => {
  res.render("book");
  // res.send('These are all the venues')
});

router.get("/venues", async (req, res) => {
  const venueid = req.query.venue_id; // Assuming 'id' is the query parameter you're checking
  console.log(venueid);

  if (!venueid) {
    // If no query parameter is present, render "selectCity"
    return res.render("selectCity");
  }

  try {
    // Assuming 'id' is the unique identifier for Venue
    const venue = await Venue.findOne({ _id: venueid });
    console.log(venue);
    const user = await User.findOne({ _id: venue.user_id });

    console.log(user);

    // Render "info" with venue and user data
    return res.render("info", { venue, user });
  } catch (error) {
    // Handle errors, e.g., Venue or User not found
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});


router.post("/venues", (req, res) => {
  //   console.log(req.body);
  req.session.city = req.body.city[0];
  // res.render('book')
  res.redirect("/venues/" + req.session.city + "/all");
});

// Venues

router.get("/venues/:city/all", async (req, res) => {
  const city = req.params.city;
  // Get all the BSON object from the database to render them on frontend
  try {
    const venues = await Venue.find({ city });
    console.log(venues);

    res.render("book", { venues });
  } catch (error) {
    console.error("Error fetching venues:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/venues/:city/:sports", (req, res) => {
  // sports[] = sports.split('+')
  res.render("book");
  // res.send('These are all the venues in <city> that has <sports>')
});

router.get("/booking", (req, res) => {
  const venue = req.query.venue;
  console.log(venue);
  res.render('payment', {venue: venue});
})

// Coaching

// Events

// ===================================================================

router.get("/listYourSport", isLoggedIn, (req, res) => {
  res.render("listSport", {msg: ""});
  // res.send('These are all the venues')
});

// Define the storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "public/images/uploads"); // Specify the path to your desired folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage }).array("images", 12);

// Handle image uploads
router.post("/listYourSport", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error uploading file" });
    }

    // Use await to wait for the Venue.findOne() promise to resolve
    Venue.findOne({ venueName: req.body.venueName }).then((venue) => {
      if (venue) {
        return res.render('listSport', { msg: "Venue Name already exists!!" });
      }

      const { venueName, address, landmark, city, sports, amenities, startTime, endTime, courts, prices, about } = req.body;

      const newVenue = new Venue({
        user_id: req.session.user.id,
        venueName: venueName,
        address: address,
        landmark: landmark,
        city: city,
        sports: sports,
        amenities: amenities,
        startTime: startTime,
        endTime: endTime,
        courts: courts,
        prices: prices,
        about: about,
        images: req.files.map((file) => file.filename),
      });

      // Save the new venue entry to the database
      return newVenue.save();
    })
    .then((savedVenue) => {
      // Handle success
      res.redirect('/myprofile');
    })
    .catch((error) => {
      // Handle error
      console.error(error);
      res.status(500).json({ error: "Error processing the request" });
    });
  });
});

// Exports
module.exports = router;


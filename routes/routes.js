const express = require("express");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const router = express.Router();

const User = require("../models/userModel");
const Venue = require("../models/venueModel");

router.get("/", (req, res) => {
  // res.send('WELCOME TO OUR SERVER')
  res.render("home");
});

router.get("/register", async (req, res) => {
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

router.get("/login", (req, res) => {
  res.render("login");
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
        res.render("myprofile", {
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
        });
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

const isLoggedIn = (req, res, next) => {
  if (req.session.isAuth) return next();
  res.redirect("/login");
};

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Unable to logout" });
    }
    res.redirect("/");
  });
});

// Session

// router.get('/session', (req, res) => {
//     req.session.isAuth = true;
//     console.log(req.session);
//     console.log(req.session.id);
//     res.send("Hello This is a session route");
// })

// ===================================================================

router.get("/search", (req, res) => {
  res.render("search");
});

// myprofile route
router.get("/myprofile", isLoggedIn, (req, res) => {
  // If logged In
  res.render("myprofile", { user: req.session.user });
});

// For phone number authentication
// router.post('/myprofile', (req, res) => {
//     // Create a new user
//     res.send('This is my profile')
//     // If not logged In -> redirect to loginPage
// })

router.get("/myprofile/bookings", (req, res) => {
  res.render("bookings");
});

router.get("/myprofile/edit", (req, res) => {
  res.send("Edit Your Profile");
});

router.post("/myprofile/edit", (req, res) => {
  // Update the details of the user
  res.send("Your Profile has been updated");
});

router.get("/myprofile/feedback", (req, res) => {
  res.render("feedback");
  //   res.send("Your feedback matters to us a lot");
});

router.get("/venues", (req, res) => {
  res.render("selectCity");
  // If city selected -> load '/venues/:city' route
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
    // console.log(typeof(venues));

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

router.get("/venues/:city/:venue", (req, res) => {
  // venue = venue.split('+')
  res.render("book");
  // res.send('These are all the details of the <venue>')
});

// Coaching

router.get("/coachings/:city/all", (req, res) => {
  // change the url to coachings/:city/all
  res.render("book");
  // res.send('These are all the coachings in <city>')
});

router.get("/coachings/:city/:sports", (req, res) => {
  res.render("book");
  // res.send('These are all the coachings in <city> that has <sports>')
});

router.get("/coachings/:city/:coaching", (req, res) => {
  res.render("book");
  // res.send('These are all the details of the <coaching>')
});

// Events

router.get("/events/:city/all", (req, res) => {
  // change the url to events/:city/all
  res.render("book");
  // res.send('These are all the events in <city>')
});

router.get("/events/:city/:sports", (req, res) => {
  res.render("book");
  // res.send('These are all the events in <city> that has <sports>')
});

router.get("/events/:city/:event", (req, res) => {
  res.render("book");
  // res.send('These are all the details of the <event>')
});

router.get("/book", (req, res) => {
  res.render("book");
  // res.send('These are all the venues')
});

router.get("/info", (req, res) => {
  res.render("info");
  // res.send('These are all the details of the <event>')
});

router.get("/bookings", (req, res) => {
  res.render("bookings");
  // res.send('These are payment page of the <event>')
});

router.get("/listYourSport", (req, res) => {
  res.render("listSport");
  // res.send('These are all the venues')
});

// // Image Uploading Code - not important
// router.get('/fileInput', (req, res)=> {
//   res.render('fileInput');
// })

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
      // Handle the error
      console.error(err);
      return res.status(500).json({ error: "Error uploading file" });
    }

    const {venueName, address, landmark, city, sports, amenities, startTime, endTime, courts, prices, about} = req.body;

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
    newVenue
      .save()
      .then((savedVenue) => {
        // Handle success
        console.log("Venue saved to the database:", savedVenue);
        res.redirect('/myprofile');
        // res.status(200).send("The form submitted successfully");
      })
      .catch((error) => {
        // Handle error
        console.error("Error saving venue to the database:", error);
        res.status(500).json({ error: "Error saving venue to the database" });
      });
  });
});

// Exports

module.exports = router;

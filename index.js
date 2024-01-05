// Importing the libraries or modules
const express = require("express");
const mongoose = require("mongoose");
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const path  = require('path');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);

// hello
// Establishing a connection to mongodb database using atlas & compass

require('dotenv').config(); // due to security reasons we save port, database url in .env file

const mongoString = process.env.DATABASE_URL; // string that is generated after creating a cluster of a project in mongoDB atlas - This enables us to store the data online

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) =>{
    console.log(error);
})

database.once('connected', () => {
    console.log("Connection Established");
})

const store = new MongoDBSession({
    uri: mongoString,
    collection: 'mySessions',
})

// Instance of express.js framework

const app = express();

// creates a session
app.use(session({
    secret: 'Key that will sign cookie',
    resave: false,
    saveUninitialized: false,
    store: store,
}))

// ======== Middlewares =========
  
app.set("view engine", "ejs");
app.use(express.json()); // used to automatically parse and extract JSON data from request bodyapp.use(express.static('views'));
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({
    extended: true
}));
// Middleware to make session available in EJS templates
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

app.use('', routes); // endpoints start with '/'

port = process.env.port || 3000;
app.listen(port, () => {
    console.log(`Server as started at port: ${port}`)
});
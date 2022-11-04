const express = require("express"); //web app framework
const app = express();
const mongoose = require("mongoose"); //db
const passport = require("passport"); //auth
const session = require("express-session");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");

//routes
const mainRoutes = require("./routes/main");
const profileRoutes = require("./routes/profiles");

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });
const PORT = process.env.PORT;

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

//Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ 
      mongoUrl: process.env.DB_STRING,
    }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, etc...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/profiles", profileRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log(`Now serving on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

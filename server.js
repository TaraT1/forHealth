const express = require("express"); //web app framework
const app = express();
const expressLayouts = require("express-ejs-layouts")
const mongoose = require("mongoose"); //db
//const passport = require("passport"); //auth
const session = require("express-session");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");

//routes
const mainRoutes = require("./routes/main");
const profileRoutes = require("./routes/profiles");
const providerRoutes = require("./routes/providers");

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });
const PORT = process.env.PORT;

// Passport config
//require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views; setting views dir as default
app.set("view engine", "ejs");
app.set("views", __dirname + "/views")

//Setting layout folder for std html layout
app.set("layout", "layouts/layout")
app.use(expressLayouts)

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use(express.urlenconded({limit: '10mb', extended: false}))

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
//app.use(passport.initialize());
//app.use(passport.session());

//Use flash messages for errors, info, etc...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/profiles", profileRoutes);
app.use("/providers", providerRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log(`Now serving on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

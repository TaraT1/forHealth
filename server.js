const express = require("express"); //web app framework
const expressLayouts = require("express-ejs-layouts")
const methodOverride = require("method-override");
const mongoose = require("mongoose"); //db
const connectDB = require("./config/database");
const passport = require("passport"); //auth
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("express-flash");
const logger = require("morgan");
const cors = require('cors')
const dayjs = require('dayjs')

const app = express();

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });
const PORT = process.env.PORT;

//passport config
require('./config/passport')(passport)

//Connect db - Setup Sessions (stored in MongoDB)
app.use(
  session({
    secret: "upright bass",
    // secret: "keyboard cat",
    resave: false, //session not saved if session is not modified
    saveUninitialized: false, //don't create session until something is stored
    store: MongoStore.create({ 
      mongoUrl: process.env.DB_STRING,
    }),
      //cookie: { maxAge: new Date ( Date.now() + (3600000) ) } 
  // Date.now() - 30 * 24 * 60 * 60 * 1000
  })
);

// Passport middleware 
app.use(passport.initialize())
app.use(passport.session())

//routes 
const authRoutes = require("./routes/auth");
const mainRoutes = require("./routes/main");
const dashboardRoutes = require("./routes/dashboard");
const profileRoutes = require("./routes/profiles");
const providerRoutes = require("./routes/providers");

// MIDDLEWARE (app.use)
//Body Parsing - pass data
app.use(express.urlencoded({ extended: true }));
// app.use(express.urlencoded({limit: '10mb', extended: false}))
app.use(express.json());

//Method Override - Use forms for put / delete
app.use(methodOverride("_method"));

//Connect To Database
mongoose.set('strictQuery', true)
connectDB();

//Static Folder
app.use(express.static("public"));

//Templating - setting layout folder for std html layout - *** Not using 
app.use(expressLayouts)
app.set("layout", "layouts/layout")

//Using EJS for views; setting views dir as default
app.set("view engine", "ejs");
app.set("views", __dirname + "/views")


// cross-origin resource sharing
app.use(cors())

//Logging
app.use(logger("dev"));

//Use flash messages for errors, info, etc...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/", authRoutes);
app.use("/dashboard", dashboardRoutes); 
app.use("/profiles", profileRoutes);
app.use("/providers", providerRoutes);

//Handle 404
app.get('*', function(req, res) {
  res.status(404).send('Error 404: Page not found')
})

//Server Running
app.listen(process.env.PORT, () => {
  console.log(`Now serving on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

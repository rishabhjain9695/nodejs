const express = require("express");
const passport = require("passport");
const cors = require("cors");
const session = require("express-session");
const server = express();
const intializePassport =
  require("./intializePassport/intitializepassport").intializePassport;
const mongoose = require("mongoose");
const router = require("./routes/User").routess;
const connectMongoDb = (async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/AuthenticationPassport");
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
})();

server.use(express.json());
server.use(cors());
intializePassport();
server.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
// This is the basic express session({..}) initialization.
server.use(passport.initialize());
// init passport on every route call.
server.use(passport.session());
// allow passport to use "express-session".
server.use("/auth", router);
server.listen(8282, () => {
  console.log("server started");
});

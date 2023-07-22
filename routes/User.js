const express = require("express");
const UserController = require("../controller/User");
const jwt=require("jsonwebtoken");
require('dotenv').config();
const passport = require("passport");
const userRouter = express.Router();
userRouter
  .post("/signUp", UserController.createUser)
  .post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        // Handle any other unexpected errors
        return res.status(500).json({ message: "An error occurred." });
      }

      if (!user) {
        // If the authentication failed, send the error message to the frontend.
        return res.status(401).json({ message: info.message });
      }
      const  token = jwt.sign({ username:user.username,email:user.email },process.env.SECRET_KEY);
    console.log(token,"token secretkey");
    res.json(token);
    })(req, res, next);
  });
exports.routess = userRouter;

const express = require("express");
const UserController = require("../controller/User");
const passport=require("passport")
const userRouter = express.Router();
userRouter
  .post("/signUp", UserController.createUser)
  .get(
    "/login",
    passport.authenticate("local",{ failureRedirect: '/login', failureMessage: true }),UserController.loginUser);
exports.routess = userRouter;

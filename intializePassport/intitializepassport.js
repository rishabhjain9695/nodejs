const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/User").User;
const jwt = require("jsonwebtoken");
exports.intializePassport = () => {
  passport.use(
    "local",
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        console.log(password, "password", email);
        try {
          const user = await User.findOne({ email });
          console.log(user, "password 22");
          if (!user) {
            return done(null, false, { message: "Incorrect Credential." });
          }
          if (user.password !== password) {
            return done(null, false, { message: "Incorrect Credential." });
          }

          return done(null, user); //token willl bw
        } catch (error) {
          console.log(error);
          return done(null, error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findOne({ id });
    console.log("Deserializer", user);
    done(null, user);
  });
};

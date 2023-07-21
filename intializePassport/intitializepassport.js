const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../model/User").User;
exports.intializePassport = () => {
  passport.use("local",
    new LocalStrategy(async (username, password, done)=> {
        console.log(password,"password");
        try {
            const user= await User.findOne({ username: username });
            console.log(user.password,"password 22");
            if (!user) {
          return done(null, false);
        }
        if ((user.password!=password)) {
          return done(null, false,{ message: "Incorrect Password" });
        }
        return done(null, user);
        } catch (error) {
            console.log(error);
            return done(null,error);
        }
     
        
    })
  );
  passport.serializeUser((user, done) => {
    if(user)
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    if(user)
    done(null, user);
  });
};

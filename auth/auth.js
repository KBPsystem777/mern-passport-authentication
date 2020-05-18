const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const UserModel = require("../model/model");

// passport middleware for registration
passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        // save the info from the user to DB
        const user = await UserModel.create({ email, password });
        // send user info to middleware
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// create passport middleware to handle user login
passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        // find the user associated with the email
        const user = await UserModel.findOne({ email });
        if (!user) {
          // if email not found
          return done(null, false, { message: "User not found" });
        }
        // validate password if it matches on the DB
        const validate = await user.isValidPassword(password);
        if (!isvalidate) {
          return done(null, false, { message: "Wrong password" });
        }
        // send the user info to next middleware
        return done(null, user, { message: "Logged in successfully!" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

const JWTStrategy = require("passport-jwt").Strategy;
// extract JWT from the user
const ExtractJWT = require("passport-jwt").ExtractJwt;

// verify if token from the user us valid
passport.use(
  new JWTStrategy(
    {
      secretOrKey: "top_secret",
      // expecting the user to sent the token as parameter
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
    },
    async (token, done) => {
      try {
        // pass the user details to the middleware
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

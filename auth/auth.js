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
        //Find the user associated with the email provided by the user
        const user = await UserModel.findOne({ email });
        if (!user) {
          //If the user isn't found in the database, return a message
          return done(null, false, {
            status: "401 - FAILED",
            message: "User not found",
          });
        }
        //Validate password and make sure it matches with the corresponding hash stored in the database
        //If the passwords match, it returns a value of true.
        const validate = await user.isValidPassword(password);
        if (!validate) {
          return done(null, false, {
            status: "401-FAILED",
            message: "Wrong Password",
          });
        }
        //Send the user information to the next middleware
        return done(null, user, {
          status: "SUCCESS",
          message: "Logged in Successfully",
        });
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

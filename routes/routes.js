const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

require("dotenv").config();

const top_secret = process.env.kbpSecretKey;

// Sign Up Route
router.post(
  "/signup",
  passport.authenticate("signup", {
    session: false,
  }),
  async (req, res, next) => {
    res.json({
      message: "Success!",
      user: req.user,
    });
  }
);

// Login Route
router.post("/login", async (req, res, next) => {
  passport.authenticate(
    "login",
    { successRedirect: "/passed", failureRedirect: "/failed" },
    async (err, user, info) => {
      try {
        if (err || !user) {
          const error = new Error("An error occured!");
          return next(error);
        }
        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);
          const body = { _id: user._id, email: user.email };
          // signing jwt
          const token = jwt.sign({ user: body }, top_secret, {
            expiresIn: "7h",
          });
          // sending back the token to the user
          return res.json({
            status: "SUCCESS",
            token: token,
            generated: new Date(),
          });
        });
      } catch (error) {
        return next(error);
      }
    }
  )(req, res, next);
});

// LogOut Route
router.get("/logout", function (req, res) {
  req.logout(), res.redirect("/"), console.log(new Date() + " User Logged out");
});

module.exports = router;

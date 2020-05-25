const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

require("dotenv").config();

const top_secret = process.env.kbpSecretKey;

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

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
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
          expiresIn: "7h  ",
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
  })(req, res, next);
});
module.exports = router;

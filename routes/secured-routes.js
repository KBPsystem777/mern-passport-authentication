const express = require("express");
const router = express.Router();
const User = require("../model/model");
// route below should be accessed only by authorized clients

// secured page for "/profile"
router.get("/profile", (req, res, next) => {
  // send back the user details and token
  res.json({
    message: "Secured paged accessed",
    user: req.user,
    token: req.query.token,
  });
});

// secured page for getting all users
router.get("/users", (req, res, next) => {
  User.find()
    .then((users) =>
      res.json({
        status: "SUCCESS",
        action: "GET USERS",
        date: new Date(),
        data: users,
      })
    )
    .catch((err) =>
      res.status(400).json({
        status: "FAILED-ERROR",
        action: "GET USERS",
        description: `Error: ${err}`,
      })
    );
});
module.exports = router;

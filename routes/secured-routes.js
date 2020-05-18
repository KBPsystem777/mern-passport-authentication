const express = require("express");
const router = express.Router();

// route below should be accessed only by authorized clients

router.get("/profile", (req, res, next) => {
  // send back the user details and token
  res.json({
    message: "Secured paged accessed",
    user: req.user,
    token: req.query.secret_token,
  });
});

module.exports = router;

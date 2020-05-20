const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();
const UserModel = require("./model/model");
require("dotenv");

const DB = process.env.URI;

mongoose
  .connect(DB, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log(new Date() + "Mongoose connected!"));
mongoose.connection.on("error", (error) => console.log(new Date() + error));
mongoose.Promise = global.Promise;

require("./auth/auth");

app.use(bodyParser.urlencoded({ extended: false }));

const routes = require("./routes/routes");
const securedRoutes = require("./routes/secured-routes");

app.use("/", routes);
// securing '/user' route
app.use(
  "/user",
  passport.authenticate("jwt", { session: false }),
  securedRoutes
);

// handling errors
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(3000, () => {
  console.log(new Date() + "Server Started!");
});

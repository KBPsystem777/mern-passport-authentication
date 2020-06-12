const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();

app.use(cors());

// User Morgan for logging
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

const DB = process.env.MONGODB_URI_PASSP || process.env.mongodb_uri_passp;
const PORT = 1993 || process.env.PORT;

app.get("/", function (req, res) {
  res.send("Hello! you may test this Auth API via Postman or the web UI!");
});

// Establish connection to mongoose
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log(Date() + ` Database connection established!`);
});

require("./auth/auth");

app.use(bodyParser.urlencoded({ extended: false }));

const routes = require("./routes/routes");
const securedRoutes = require("./routes/secured-routes");

app.use("/", routes);

// securing "/user" and "/users" routes
app.use(
  "/user",
  passport.authenticate("jwt", { session: false }),
  securedRoutes
);
app.use(
  "/users",
  passport.authenticate("jwt", { session: false }),
  securedRoutes
);

// handling errors
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(PORT, () => {
  console.log(new Date() + ` Server running on http://localhost:${PORT}`);
});

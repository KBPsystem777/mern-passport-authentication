const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("errorhandler");

// configure mongoose's promise to global
mongoose.promise = global.Promise;

// isProduction?
const isProduction = process.env.NODE_ENV === "production";

const app = express();
app.use(cors());
app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(session({ secret: "KBPsecretkey", cookie: { max } }));

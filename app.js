const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(morgan("dev"));
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "OK",
  });
});

// app.use("/auth", require("./modules/auth/auth.routes"));

module.exports = app;

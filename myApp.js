require('dotenv').config();

const express = require('express');
const app = express();


app.use("/public", express.static(__dirname + "/public"));


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});


app.get("/json", (req, res) => {
  let message = "Hello json";

  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }

  res.json({ message });
});

module.exports = app;

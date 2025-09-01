require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser'); 
const app = express();


app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});


app.use("/public", express.static(__dirname + "/public"));


app.use(bodyParser.urlencoded({ extended: false }));


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


app.get("/now", 
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  }, 
  (req, res) => {
    res.json({ time: req.time });
  }
);


app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({ echo: word });
});


app.get("/name", (req, res) => {
  const firstName = req.query.first;
  const lastName = req.query.last;
  res.json({ name: `${firstName} ${lastName}` });
});


app.post("/name", (req, res) => {
  const firstName = req.body.first;
  const lastName = req.body.last;
  res.json({ name: `${firstName} ${lastName}` });
});

module.exports = app;

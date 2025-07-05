const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send("Connected");
});

app.listen(7777, () => {
  console.log("Listening to port 7777");
});

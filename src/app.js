const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");

const app = express();

app.post("/signup", async (req, res) => {
  // Creating a new instance of the User model
  const user = new User({
    firstName: "Laxmi",
    lastName: "Waghmore",
    emailId: "xyz@gmail.com",
    password: "laxmi@123",
  });

  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Connected to db");
    app.listen(7777, () => {
      console.log("Listening to port 7777");
    });
  })
  .catch((err) => console.err("DB cannot be connected"));

const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  //   console.log(req);
  //   Creating a new instance of the User model
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({ emailId: "jsgh@gmail.com" });
    if (users.length === 0) {
      res.send("User not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/user", async (req, res) => {
  const userEmailId = req.body.email;
  try {
    const user = await User.findOne({ emailId: userEmailId });
    if (!user) {
      res.send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/userByID", async (req, res) => {
  try {
    const id = req.body.id;
    const userByID = await User.findById({ _id: id });
    console.log(userByID);
    // const userByID = await User.findById(id);
    if (!userByID) {
      res.send("User not Found");
    } else {
      res.send(userByID);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.send(allUsers);
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.id;
  try {
    const deleteUser = await User.findByIdAndDelete(userId);
    console.log(deleteUser);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.patch("/user", async(req, res) =>{
    const id = req.body.userId
    const data = req.body
    try {
      const updatedUser = await User.findByIdAndUpdate(id, data, {returnDocument:"after"})  
      console.log(updatedUser) //Bydefault prev user
      res.send("User updated successfully")
    } catch (error) {
        res.status(400).send("Something went wrong ");
    }
})

connectDB()
  .then(() => {
    console.log("Connected to db");
    app.listen(7777, () => {
      console.log("Listening to port 7777");
    });
  })
  .catch((err) => console.error("DB cannot be connected"));

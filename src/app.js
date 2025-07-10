const express = require("express");
const { connectDB } = require("./config/database");
const User = require("./models/user");
const { validate , validateLogin} = require("./utils/validation");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  //   console.log(req);
  //   Creating a new instance of the User model
  //   const user = new User(req.body);

  try {
    validate(req.body);
    const { firstName, lastName, password, emailId } = req.body;

    // password encryption while saving in DB
    // bcrypt.hash(myPlaintextPassword, saltRounds).then(function (hash) {
    // Store hash in your password DB.
    // });
    const passwordHash = await bcrypt.hash(password, 10);

    //   Creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      password: passwordHash,
      emailId,
    });
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error saving the user:" + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    validateLogin(req.body)
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Please sign up");
    }

    // if user is present check for password ( returns True or False)
    // await bcrypt.compare(userEnteredPassword, fromDbPassword);

    const isPasswordValid = await bcrypt.compare(password, user?.password);
    if (!isPasswordValid) {
      throw new Error("Please enter correct password");
    }
    res.send("Login successfully");
  } catch (error) {
    res.status(400).send("Error: " + error?.message);
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

app.patch("/user/:userId", async (req, res) => {
  console.log(req.params?.userId);
  const id = req.params?.userId;
  const data = req.body;
  const receivedFields = Object.keys(data);
  //   [gender,skills, emailId]
  try {
    const fields = ["about", "gender", "age", "skills", "photoUrl"];
    const allowedFields = receivedFields.every((x) => fields.includes(x));
    if (!allowedFields) {
      throw new Error("Update not allowed");
    }
    if (data.skills.length > 10) {
      throw new Error("Skills cannot be greater than 10..");
    }
    const updatedUser = await User.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(updatedUser); //Bydefault prev user
    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send("Something went wrong: " + error.message);
  }
});

app.patch("/emailID", async (req, res) => {
  const email = req.body.email;
  const data = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate({ emailId: email }, data, {
      returnDocument: "after",
    });
    console.log(updatedUser); //Bydefault prev user
    res.send("User updated successfully");
  } catch (error) {
    res.status(400).send("Something went wrong ");
  }
});

connectDB()
  .then(() => {
    console.log("Connected to db");
    app.listen(7777, () => {
      console.log("Listening to port 7777");
    });
  })
  .catch((err) => console.error("DB cannot be connected"));

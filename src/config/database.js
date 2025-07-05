const mongoose = require("mongoose");

const uri =
  "mongodb+srv://waghmorelaxmi:EYEW9MHM5bHImEW6@cluster0.qx2wqxa.mongodb.net/devTinderBackend";

const connectDB = async () => {
  await mongoose.connect(uri);
};

// this will first listen to the port and connect to DB which is incorrect
// connectDB()
//   .then(() => console.log("Connected to db"))
//   .catch((err) => console.err("DB cannot be connected"));

module.exports = { connectDB };

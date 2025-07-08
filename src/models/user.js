const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 100,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 100,
    },
    emailId: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min:18
    },
    gender: {
      type: String,
      validate: (value) => {
        const data = value.toLowerCase();
        if (!["male", "female", "other"].includes(data)) {
          throw new Error("Gender is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
    },
    about: {
      type: String,
      default: "Hi this is about section",
    },
    skills: {
      type: [String],
      validate(value) {
        if(value.length === 1 ){
            throw new Error("llll")
        }
      },
    },
  },
  { timestamps: true }
);

// const User = mongoose.model("User", userSchema)
// module.exports = User

module.exports = mongoose.model("User", userSchema);

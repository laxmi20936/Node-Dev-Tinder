const mongoose = require("mongoose");
const validator = require("validator");

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
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Enter a Strong Password: " + value);
        }
      },
    },
    age: {
      type: Number,
      min: 18,
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
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Photo url is not valid");
        }
      },
    },
    about: {
      type: String,
      default: "Hi this is about section",
    },
    skills: {
      type: [String],
      //   validate(value) {
      //     if(value.length === 1 ){
      //         throw new Error("llll")
      //     }
      //   },
    },
  },
  { timestamps: true }
);

// const User = mongoose.model("User", userSchema)
// module.exports = User

module.exports = mongoose.model("User", userSchema);

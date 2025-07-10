const validator = require("validator");
const validate = (data) => {
  const { firstName, lastName, password, emailId, age, skills } = data;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Use a strong Password");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  }

  //   else if (age && age < 18) {
  //     throw new Error("Agee should be greater than 18");
  //   } else if (skills?.length > 10) {
  //     throw new Error("Up can add only 10 skills");
  //   }
  //     This code is not needed while signup
  //     Sign up not needs firstName, LastName, email, password
};

module.exports = { validate };

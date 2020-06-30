const bcrypt = require("bcryptjs");

exports.hashPassword = async (enteredPassword) => {
  /* 
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(enteredPassword, salt); */
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(enteredPassword, salt);
  } catch (error) {
    throw new Error(error);
  }
};

exports.comparePasswords = async (enteredPassword, registeredHash) => {
  try {
    return await bcrypt.compare(enteredPassword, registeredHash);
  } catch (error) {
    console.log("Error " + error);
    return new Error("Some error on server");
  }
};
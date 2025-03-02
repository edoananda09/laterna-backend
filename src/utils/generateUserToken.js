const userModels = require("../models/user");
const jwt = require("jsonwebtoken");

exports.generateUserToken = async (email) => {
  const userData = await userModels.getUserByEmail(email);
  if (userData.length === 0) return " user not found!!";
  const token = jwt.sign(
    { email: userData[0].email, user_id: userData[0].id_user },
    process.env.APP_KEY,
    { expiresIn: "5m" }
  );
  return token;
};

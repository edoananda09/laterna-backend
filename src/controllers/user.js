// Import user models
const userModels = require("../models/user");
// import response helper
const { response } = require("../helpers/standardRes");
// import bcrypt untuk enkripsi password
const bcrypt = require("bcrypt");
// import jesonwebtoken
const jwt = require("jsonwebtoken");

//get user 
exports.getUser = async (req, res) => {
  const user = await userModels.getUser();
  return response(res, 200, true, "List User", user);
};

// login user with jwt
exports.loginUser = async (req, res) => {
  const email = req.body.email;
  // get user by email
  const userData = await userModels.getUserByEmail(email);
  if (userData.length === 0)
    return response(res, 404, true, "User Not Found!!");
  //compare password with bcrypt compare
  const comparePassword = await bcrypt.compare(
    req.body.password,
    userData[0].password
  );
  // if password true then create token
  if (comparePassword) {
    // create token with jwt expired 1m
    const accessToken = jwt.sign(
      // payload token with email and user_id from user data 
      { email: userData[0].email, user_id: userData[0].id_user },
      process.env.APP_KEY,
      { expiresIn: "1m" }
    );
    // return response with token
    return response(res, 200, true, "Login success!", {
      accessToken: accessToken,
    });
  } else {
    // if password false return response
    return response(res, 200, true, "Wrong password!!");
  }
};
// check accesstoken with jwt verify
exports.checkAccesstoken = async (req, res) => {
  const { access_token } = req.body;
  // check token with jwt verify
  try {
    const checkToken = jwt.verify(access_token, process.env.APP_KEY);
    // if token still valid return response
    if (checkToken) {
      return response(res, 200, true, "Token still valid");
    }
    // if token invalid return response
  } catch (error) {
    if (error.name === "TokenExpiredError")
      return response(res, 401, false, "Token invalid");
  }
};

exports.createUser = async (req, res) => {
  const body = req.body;
  const encryptPassword = await bcrypt.hash(body.password, 10);
  const userData = {
    email: body.email,
    password: encryptPassword,
  };

  const results = await userModels.createUser(userData);
  if (results.affectedRows === 1) {
    return response(res, 200, true, "User berhasil di tambahkan", userData);
  } else {
    return response(res, 500, false, "User gagal di tambahkan", userData);
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params.id;
  const result = await userModels.deleteUser(id);

  if (result.affectedRows === 1) {
    return response(res, 200, true, "user berhasil dihapus", result);
  } else {
    return response(res, 500, false, "user gagal dihapus", result);
  }
};

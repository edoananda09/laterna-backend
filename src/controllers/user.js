const userModels = require("../models/user");
const { response } = require("../helpers/standardRes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { emailTransport } = require("../helpers/emailTransport");
const { generateUserToken } = require("../utils/generateUserToken");

exports.getUser = async (req, res) => {
  const user = await userModels.getUser();
  return response(res, 200, true, "List User", user);
};

exports.loginUser = async (req, res) => {
  const email = req.body.email;

  const userData = await userModels.getUserByEmail(email);
  if (userData.length === 0)
    return response(res, 404, true, "User Not Found!!");

  const comparePassword = await bcrypt.compare(
    req.body.password,
    userData[0].password
  );

  if (comparePassword) {
    const accessToken = jwt.sign(
      { email: userData[0].email, user_id: userData[0].id_user },
      process.env.APP_KEY,
      { expiresIn: "1m" }
    );

    return response(res, 200, true, "Login success!", {
      accessToken: accessToken,
    });
  } else {
    return response(res, 200, true, "Wrong password!!");
  }
};

exports.checkAccesstoken = async (req, res) => {
  const { access_token } = req.body;
  try {
    const checkToken = jwt.verify(access_token, process.env.APP_KEY);
    if (checkToken) {
      return response(res, 200, true, "Token still valid");
    }
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
    const token = await generateUserToken(body.email);

    try {
      await emailTransport.sendMail({
        from: `"noreply" <${process.env.USER_EMAIL}>`, // sender address
        to: `${body.email}`, // list of receivers
        subject: " verification new account app laterna", // Subject line
        text: `Verify this token: ${token}`, // plain text body
      });
    } catch (error) {
      console.error(error.message);
    }

    return response(res, 200, true, "User berhasil di tambahkan");
  } else {
    return response(res, 500, false, "User gagal di tambahkan");
  }
};

exports.verifyEmailController = async (req, res) => {
  const { token, email } = req.body;

  try {
    const checkToken = jwt.verify(token, process.env.APP_KEY);
    if (checkToken) {
      const updateRole = await userModels.updateRoleUser(
        email,
        "verified_user"
      );
      if (updateRole.affectedRows > 0)
        return response(res, 200, true, "User Verification Succesfully");
    }
  } catch (error) {
    return response(res, 400, false, error.message);
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

const userModels = require("../models/user");
const { response } = require("../helpers/standardRes");
const bcrypt = require("bcrypt");


exports.getUser = async (req, res) => {
  const user = await userModels.getUser();
  return response(res, 200, true, "List User", user);
};

exports.loginUser = async (req, res) => {
  const email = req.params.email;

  const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
  };

  const result = await userModels.getUserByEmail(email);
  if(result.length > 0) {
    const user = result[0];
    const isMatch = await comparePassword(req.body.password, user.password);
    if(isMatch) {
      return response(res, 200, true, "Login Success", user);
    }else {
      return response(res, 401, false, "Password is wrong", null);
    }
  }
}

  // const result = await userModels.getUserByEmail(email);
  // if(result.affectedRows === 1) {
  //     return response(res, 200, true, `Detail users found! ${email}`, result);
  // }else {
  //     return response(res, 404, false, `Detail users not found! ${email}`, result);
  // }

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

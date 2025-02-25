const userModels = require("../models/user");
const { response } = require("../helpers/standardRes");
const bcrypt = require("bcrypt");

exports.getUser = async (req, res) => {
  const user = await userModels.getUser();
  return response(res, 200, true, "List User", user);
};

exports.getUserById = async (req, res) => {
  const id = req.params.id;
  const result = await userModels.getUserById(id);
  return response(res, 200, true, `User id ${id}`, result);
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
  const { id } = req.params;
  const result = await userModels.deleteUser(id);

  if (result.affectedRows === 1) {
    return response(res, 200, true, "user berhasil dihapus", result);
  }
};

// Import user models
const userModels = require("../models/user");
// import response helper
const { response } = require("../helpers/standardRes");
// import bcrypt untuk enkripsi password
const bcrypt = require("bcrypt");

// import jsonwebtoken
const jwt = require("jsonwebtoken");

//get user
exports.getUser = async (req, res) => {
  const user = await userModels.getUser();
  return response(res, 200, true, "List User", user);
};

// login user with jwt
exports.loginUser = async (req, res) => {
  const email = req.body.email;

  //get user by email
  const userData = await userModels.getUserByEmail(email);
  if(userData.length === 0) return response(res,404,true,"Email Not Found")

  //compare password with bcrypt
  const comparePassword = await bcrypt.compare(req.body.password, userData[0].password);
  //
  if(comparePassword){

    //create token dari login user dan expired token 1 menit
    const accessToken = jwt.sign({email: userData[0].email , user_id:userData[0].id_user},process.env.APP_KEY, {expiresIn: "1m"});
    //return response login success with token
    return response(res,200,true,"login success",{accessToken: accessToken});
  }else{
    return response(res,400,false,"password is wrong")
  }
}

//check access token
exports.accessToken = async (req, res) =>{

  //buat variabel token dari body
  const {accessToken} = req.body;
  //check token
  try{
    //verify token
    const checkToken = jwt.verify(accessToken, process.env.APP_KEY);
    //return response token valid
    if(checkToken){
      return response(res,200,true,"Token Valid");
    }
    //return response token invalid
  }catch (error) {
    //check token expired
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

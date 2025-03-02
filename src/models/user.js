const db = require("../helpers/db");
const { promisify } = require("util");
const execPromise = promisify(db.query).bind(db);

exports.getUser = () => {
  return execPromise("SELECT * FROM user");
};

exports.getUserByEmail = (email) => {
  return execPromise(`SELECT * FROM user WHERE email='${email}'`);
};

exports.createUser = (data) => {
  return execPromise(
    `INSERT INTO user (email, password) VALUES ('${data.email}', '${data.password}' )`
  );
};

exports.updateRoleUser = (email, role) => {
  return execPromise(`UPDATE user SET role="${role}" WHERE email="${email}"`);
};

exports.deleteUser = (id) => {
  return execPromise(`DELETE FROM user WHERE id = ${id}`);
};

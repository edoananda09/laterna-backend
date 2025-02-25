const db = require("../helpers/db");
const { promisify } = require("util");
const execPromise = promisify(db.query).bind(db);

exports.getUser = () => {
  return execPromise("SELECT * FROM user");
};

exports.getUserById = (id) => {
  return execPromise(`SELECT * FROM user WHERE id = ${id}`);
};

exports.createUser = (data) => {
  return execPromise(
    `INSERT INTO user (email, password) VALUES ('${data.email}', '${data.password}' )`
  );
};

exports.deleteUser = (id) => {
  return execPromise(`DELETE FROM user WHERE id = ${id}`);
};

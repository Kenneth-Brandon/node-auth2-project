const db = require('../../database/db-config.js');

function findAllUsers() {
  return db('userAuth');
}

function findUserById(id) {
  return db('userAuth').where({ id }).first();
}

function findUserByName(filter) {
  return db('userAuth').where(filter).orderBy('id');
}

function addUser(user) {
  return db('userAuth')
    .insert(user)
    .then((u) => {
      return findUserById(u[0]);
    })
    .catch((err) => {
      throw err;
    });
}

function filterByDepartment(dept) {
  return db('userAuth').where({ department: dept }).orderBy('id');
}

module.exports = {
  findAllUsers,
  addUser,
  findUserById,
  findUserByName,
  filterByDepartment,
};

exports.seed = function (knex) {
  return knex('userAuth').insert([
    { username: 'lambda', password: '1234', department: 'admin' },
    { username: 'student 1', password: '1', department: 'CS' },
    { username: 'student 2', password: '2', department: 'IOS' },
  ]);
};

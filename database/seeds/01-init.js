exports.seed = function (knex) {
  return knex('userAuth').insert([
    { username: 'lambda', password: 'admin', department: 'admin' },
    { username: 'student1', password: 'password1', department: 'CS' },
    { username: 'student2', password: 'password2', department: 'JavaScript' },
  ]);
};

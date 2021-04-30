const db = require('./db');

const User = require('./models/user');
const Workout = require('./models/workout');

User.hasMany(Workout);
Workout.belongsTo(User);

module.exports = {
  db,
  User,
  Workout,
};

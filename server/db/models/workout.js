const Sequelize = require('sequelize');
const db = require('../db');

const Workout = db.define('workout', {
  squats: {
    type: Sequelize.INTEGER,
  },
  pushups: {
    type: Sequelize.INTEGER,
  },
  situps: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Workout;

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const User = require('./user')(sequelize);
const Appointment = require('./appointment')(sequelize);

User.hasMany(Appointment);
Appointment.belongsTo(User);

sequelize.sync();

module.exports = { sequelize, User, Appointment };

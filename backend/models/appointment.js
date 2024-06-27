const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Appointment', {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  });
};

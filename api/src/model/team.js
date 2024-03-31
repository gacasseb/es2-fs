const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Project = require('./project');

const Team = sequelize.define("Team", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Project.hasMany(Team, {
  foreignKey: {
    allowNull: true,
  },
  onDelete: 'SET NULL',
});

Team.belongsTo(Project, {
  foreignKey: {
    allowNull: true,
  },
  onDelete: 'SET NULL',
})

// sequelize.sync({ force: true }).then(() => {
//   console.log('Database synchronized');
// }).catch((err) => {
//   console.error('Error synchronizing database:', err);
// });

module.exports = Team;

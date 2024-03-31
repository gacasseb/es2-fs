const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Team = require('./team');

const Member = sequelize.define("Member", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthdate: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM('Masculino', 'Feminino', 'Todes'),
    allowNull: false,
  },
  race: {
    type: DataTypes.ENUM('Branco', 'Preto', 'Pardo', 'Indígena', 'Amarelo'),
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('Analista', 'Desenvolvedor', 'DBA', 'Designer', 'QA', 'Delivery', 'PO'),
    allowNull: false,
  },
});

Member.belongsTo(Team, {
  foreignKey: {
    allowNull: true,
  },
  onDelete: 'SET NULL',
})

sequelize.sync({ force: true }).then(() => {
  console.log('Database synchronized');
}).catch((err) => {
  console.error('Error synchronizing database:', err);
});

module.exports = Member;

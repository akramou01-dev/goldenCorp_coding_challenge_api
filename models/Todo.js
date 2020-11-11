const Sequelize = require("sequelize");
const sequelize = require("../util/Database");

const todo = sequelize.define('todo', 
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    done : {
        type : Sequelize.BOOLEAN, 
        allowNull : false, 
        defaultValue : false,
    }
  },
  {
    timestamps: false,
    freezeTableName: true,
    tableName: "Todo",
  }
);

module.exports = todo;

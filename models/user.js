const { Sequelize, Models, DataTypes } = require('sequelize');

const sequelize = { Sequelize, Models, DataTypes };


module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        Userid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique : true,
        },
        pseudo: {
            type: DataTypes.STRING,
            createdAt: DataTypes.DATE,
            allowNull : false,
            unique: true,
        }    
    });
    return User;
    
};

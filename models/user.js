const { Sequelize, Models, DataTypes } = require("sequelize");
const sequelize = new Sequelize("groupomania_p7", "root", "minouu", {
    host: "localhost",
    dialect: "mysql",
});

const User = sequelize.define("User", {
    Userid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        createdAt: DataTypes.DATE,
    },
    pseudo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        createdAt: DataTypes.DATE,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        createdAt: DataTypes.DATE,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        createdAt: DataTypes.DATE,
    },
    
});
User.sync();
module.exports = User;






// module.exports = (sequelize, DataTypes) => {
//     const User = sequelize.define('User', {
//         Userid: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//             unique : true,
//         },
//         pseudo: {
//             type: DataTypes.STRING,
//             createdAt: DataTypes.DATE,
//             allowNull : false,
//             unique: true,
//         }
//     });
//     User.sync();
//     return User;

// };

const sequelize = require('../db.js');

const {DataTypes} = require('sequelize');

const Users = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    fio: {type: DataTypes.STRING, allowNull: false},
    login: {type: DataTypes.STRING, unique: true, allowNull: false},
    phone: {type: DataTypes.STRING, unique: true, allowNull: false},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}
})

const Application = sequelize.define('application', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    carNumber: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, allowNull: false},
    status: {type: DataTypes.STRING, allowNull: false}
})

Users.hasMany(Application);
Application.belongsTo(Users)

module.exports = {
    Users,
    Application
}
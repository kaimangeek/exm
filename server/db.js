const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'postgres', 
    'postgres',
    'qwerty',
    {
        dialect: 'postgres',
        host: 'localhost',
        port: '5432'
    }
)
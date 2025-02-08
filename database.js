const Sequelize = require('sequelize')

const sequelize = new Sequelize('cricket','root','rajatraj',{
    dialect: 'mysql',
    host: 'localhost',
})
module.exports = sequelize;
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database')

const Cricket = sequelize.define('crickets', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    birthplace: {
        type: DataTypes.STRING,
        allowNull: false
    },
    career: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    matches: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fifties: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    centuries: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    wickets: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    average: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'crickets',
    timestamps: false
});

module.exports = Cricket;
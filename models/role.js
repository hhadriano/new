const { DataTypes } = require('sequelize');

const db = require('../db/db');

const Role = db.define('role', {

    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'USER_ROLE',
        primaryKey: true
    }
}, {
    timestamps: false
});

module.exports = Role;
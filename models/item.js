const { DataTypes } = require("sequelize");
const db = require("../db/db");


const Item = db.define('item', {

    item_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    price: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    image: { type: DataTypes.STRING },
    available: { type: DataTypes.BOOLEAN, defaultValue: true },
    number: { type: DataTypes.INTEGER },
    description: { type: DataTypes.TEXT }
}, {
    timestamps: false
})

module.exports = Item;
const { DataTypes } = require("sequelize");
const Category = require("./category");

// const Role = require("./role");

const User = require("./user");
const Item = require("./item");


User.hasMany(Category, {
    foreignKey: {
        name: 'user_id',
        type: DataTypes.UUID,
        allowNull: false
    }
})

Category.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Item, {
    foreignKey: {
        name: 'user_id',
        type: DataTypes.UUID,
        allowNull: false
    }
})

Item.belongsTo(User, { foreignKey: 'user_id' });

Category.hasMany(Item, {
    foreignKey: {
        name: 'category_id',
        type: DataTypes.UUID,
        allowNull: false
    }
})

Item.belongsTo(Category, { foreignKey: 'category_id' })
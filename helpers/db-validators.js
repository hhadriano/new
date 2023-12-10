const Category = require("../models/category");
const Item = require("../models/item");
const Role = require("../models/role");
const User = require("../models/user");

const isRoleValid = async (role = '') => {

    const roleExists = await Role.findOne({ where: { role: role } })
    if (!roleExists) {
        throw new Error(`the role ${role} does not exists in the database`)
    }
}

const isEmailValid = async (email = '') => {

    const emailExists = await User.findOne({
        where: { email: email.toLowerCase() }
    });
    if (emailExists) {
        throw new Error(`the email ${email} does exists in the database`)
    }
}

const existsUserById = async (id) => {

    const userExists = await User.findByPk(id)
    if (!userExists) {
        throw new Error(`The id: ${id} does not exists`)
    }
}

const existCategoryById = async (id) => {

    const categoryExists = await Category.findByPk(id)
    if (!categoryExists) {
        throw new Error(`The id: ${id} does not exists in the db`)
    }
}

const existItemById = async (id) => {

    const itemExists = await Item.findByPk(id)
    if (!itemExists) {
        throw new Error(`The id: ${id} does not exists in the db`)
    }
}

const availableTables = async (table = '', tables = []) => {

    const includeTable = tables.includes(table);
    if (!includeTable) {
        throw new Error(`the table ${table} is not available - available tables ${tables}`)
    }
    return true
}

module.exports = {
    isRoleValid,
    isEmailValid,
    existsUserById,
    existCategoryById,
    existItemById,
    availableTables
}
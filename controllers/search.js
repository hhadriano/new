const { request, response } = require("express");
// const { DataTypes } = require('sequelize');
const { v4: uuidv4, validate } = require('uuid');

const User = require('../models/user');
const { Op } = require("sequelize");
const Item = require("../models/item");
const Category = require("../models/category");

availableTables = ['users', 'categories', 'items']

const searchUsers = async (term = '', res = response) => {

    const isUuid = validate(term);

    if (isUuid) {
        const user = await User.findByPk(term)
        return res.status(200).json({
            result: (user) ? [user] : []
        })
    }

    const users = await User.findAll({
        where: {
            [Op.or]: [
                {
                    name: {
                        [Op.like]: `%${term.toLocaleLowerCase()}%`
                    }
                }, {
                    email: {
                        [Op.like]: `%${term.toLocaleLowerCase()}%`
                    }
                }
            ],
            [Op.and]: [
                {
                    state: true
                }
            ]
        }, attributes: { exclude: ['state', 'password', 'role'] }
    });

    res.status(200).json({ results: users })

}

const searchCategories = async (term = '', res = response) => {

    const isUuid = validate(term);

    if (isUuid) {
        const category = await Category.findByPk(term)
        return res.status(200).json({
            result: (category) ? [category] : []
        })
    }

    const categories = await Category.findAll({

        where: {
            name: {
                [Op.like]: `%${term.toLocaleUpperCase()}%`
            },
            [Op.and]: [
                {
                    state: true
                }
            ]
        }, attributes: { exclude: ['state', 'user_id'] }
    });

    res.status(200).json({ results: categories })

}

const searchItems = async (term = '', res = response) => {

    const isUuid = validate(term);

    if (isUuid) {
        const item = await Item.findByPk(term)
        return res.status(200).json({
            result: (item) ? [item] : []
        })
    }

    const items = await Item.findAll({
        where: {
            name: {
                [Op.like]: `%${term.toLocaleUpperCase()}%`
            },
            [Op.and]: { state: true },
            [Op.and]: { available: true }
        }, attributes: { exclude: ['user_id', 'category_id', 'state'] }
    });

    res.status(200).json({ results: items })
}

const search = async (req = request, res = response) => {

    const { table, term } = req.params;

    if (!availableTables.includes(table)) {
        return res.status(400).json({ msg: `the available tables are ${availableTables}` })
    }

    switch (table) {

        case 'users':
            searchUsers(term, res)
            break;
        case 'categories':
            searchCategories(term, res)
            break;
        case 'items':
            searchItems(term, res)
            break;
        default:
            res.status(500).json({
                msg: ''
            });
    }
}


module.exports = search;
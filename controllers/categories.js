const { request, response } = require("express");

const Category = require("../models/category");


const getCategories = async (req = request, res = response) => {

    const { limit = 5, since = 0 } = req.query;

    try {

        const [total, categories] = await Promise.all([
            await Category.count({ where: { state: true } }),
            await Category.findAll({
                where: { state: true },// limit: limit, offset: since,
                attributes: { exclude: ['state', 'user_id'] }
            })
        ])

        res.status(200).json({
            total,
            categories
        });

    } catch (error) {
        res.status(500).json({
            msg: 'Database error',
            err: error
        })
    }
}

const getCategory = async (req = request, res = response) => {

    const { id } = req.params

    const category = await Category.findByPk(id, { attributes: { exclude: ['user_id', 'state'] } });

    try {

        if (!category) {
            return res.status(400).json({
                msg: `the category with id: ${id} does not exist in the db`
            })
        } res.status(200).json({
            msg: 'Success',
            category
        })

    } catch (error) {
        res.status(500).json({
            msg: 'database error'
        })
    }
}

const postCategory = async (req = request, res = response) => {

    // Validate the Category in the db 
    const name = req.body.name.toUpperCase();

   // const categoryDb = await Category.findOne({ where: { name: name } });

    try {

        // if (categoryDb) {
        //     return res.status(400).json({
        //         msg: ` The category ${categoryDb.dataValues.name} already exists`
        //     })
        // }

        //Generate the Data
        const data = { name: name, user_id: req.user.id }

        const category = await new Category(data)

        await category.save()

        res.status(201).json({
            msg: 'Created',
            name
        })

    } catch (error) {
        res.status(500).json({
            msg: 'Db Error'
        })
        console.log(error)
    }

}

const putCategory = async (req = request, res = response) => {

    const { id } = req.params
    const { state, user_id, ...data } = req.body


    try {

        data.user_id = req.user.id;
        data.name = data.name.toUpperCase();

        // console.log(data)

        const category = await Category.findByPk(id, { attributes: { exclude: ['user_id', 'state'] } });

        await category.update(data);

        res.status(200).json({ msg: 'Updated', name: category.name })

    } catch (error) {
        res.status(500).json({
            msg: 'db error',
            error
        })
    }
}

const deleteCategory = async (req = request, res = response) => {

    const { id } = req.params;

    try {

        const category = await Category.findByPk(id);

        await category.update({ state: false });

        res.status(200).json({ deleted_category: category.dataValues.name })

    } catch (error) {
        res.status(500).json({
            error
        })
    }
}

module.exports = {
    getCategories,
    getCategory,
    postCategory,
    putCategory,
    deleteCategory
}
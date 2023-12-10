const { response, request } = require("express");
const Item = require("../models/item");

const getItem = async (req = request, res = response) => {

    const { limit = 5, since = 0 } = req.query;

    try {

        const [total, items] = await Promise.all([
            await Item.count({ where: { state: true } }),
            await Item.findAll({
                where: { state: true }, //limit: limit, offset: since
            })])

        res.status(200).json({
            items
        });

    } catch (error) {
        res.status(500).json({
            msg: 'Database error',
            err: error
        })
    }
}

const getItemById = async (req = request, res = response) => {

    const { id } = req.params

    const item = await Item.findByPk(id);

    try {

        if (!item) {
            return res.status(400).json({ msg: `the item with id: ${id} does not exist in the db` })

        } res.status(200).json({
            msg: 'Success',
            item
        })

    } catch (error) {
        res.status(500).json({
            msg: 'database error'
        })
    }
}

const postItem = async (req = request, res = response) => {

    const { state, user_id, ...body } = req.body;

    // const itemExist = await Item.findOne({ where: { name: req.body.name.toUpperCase() } });

    try {

        if (itemExist) {
            return res.status(400).json({ msg: ` The item ${itemExist.dataValues.name} already exists` })
        }

        //Generate the Data
        const data = {
            ...body,
            name: body.name.toUpperCase(),
            // user_id: req.user.id
        }

        const item = await new Item(data)

        await item.save()

        res.status(201).json({
            msg: 'Created',
            item
        })

    } catch (error) {
        res.status(500).json({
            msg: 'Db Error'
        })
        console.log(error);
    }

}

const putItem = async (req = request, res = response) => {

    const { id } = req.params;
    const { body } = req;

    try {

        //Validate user's existence
        const item = await Item.findByPk(id);

        if (!item) {
            return res.status(404).json({
                msg: `Item with ${id} not found`
            })
        }
        //Updating
        await item.update(body)

        res.json({
            msg: 'item updated',
            user
        })

    } catch (error) {
        res.status(500).json({
            msg: 'Server Error'
        })
        console.log(error)
    }
}

const deleteItem = async (req = request, res = response) => {
    const { id } = req.params;

    try {

        const item = await Item.findByPk(id);

        await item.update({ state: false });

        res.status(200).json({ deleted_item: item.dataValues })

    } catch (error) {
        res.status(500).json({
            msg: 'Database error'
        })
    }
}


module.exports = {
    getItem,
    getItemById,
    postItem,
    putItem,
    deleteItem
}
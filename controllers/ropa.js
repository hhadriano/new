const { response, request } = require("express");
const Ropa = require("../models/ropa");

const getRopa = async (req = request, res = response) => {

    const { limit = 5, since = 0 } = req.query;

    try {

        const [total, items] = await Promise.all([
            await Ropa.findAll({
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

const postRopa = async (req = request, res = response) => {

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
            user_id: req.user.id
        }

        const item = await new Ropa(data)

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

const putRopa = async (req = request, res = response) => {

    const { id } = req.params;
    const { body } = req;

    try {

        //Validate user's existence
        const item = await Ropa.findByPk(id);

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

const deleteRopa = async (req = request, res = response) => {
    
    const { id } = req.params;

    try {

        const item = await Ropa.findByPk(id);

        await item.update({ state: false });

        res.status(200).json({ deleted_item: item.dataValues })

    } catch (error) {
        res.status(500).json({
            msg: 'Database error'
        })
    }
}


module.exports = {
    getRopa,
    postRopa,
    putRopa,
    deleteRopa
}
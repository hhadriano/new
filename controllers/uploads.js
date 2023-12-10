const path = require('path');
const fs = require('fs');

const { request, response } = require("express");

const { uploadFile } = require("../helpers/upload-file");
const User = require("../models/user");
const Item = require("../models/item");


const loadFile = async (req = request, res = response) => {

    try {

        const name = await uploadFile(req.files, undefined, 'images');

        res.status(200).json({
            name,
            status: '200',
            msg: 'success',
            posted_by: req.user
        });

    } catch (error) {
        res.json({
            msg: 'there has been an error',
            e: error
        });
    }
}

const updateImage = async (req = request, res = response) => {

    const { table, id } = req.params

    let model;

    switch (table) {
        case 'users':
            model = await User.findByPk(id);
            if (!model) {
                return res.status(404).json({ msg: `the user with id: ${id} does not exist in db` })
            }
            break;
        case 'items':
            model = await Item.findByPk(id);
            if (!model) {
                return res.status(404).json({ msg: `the item with id: ${id} does not exist in db` })
            }
            break

        default:
            res.status(500).json({ msg: 'forgot to validate it' })
    }

    if (model.image) {
        const imagePath = path.join(__dirname, '../uploads', table, model.image);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    }

    const name = await uploadFile(req.files, undefined, table);
    model.image = name;
    await model.save();


    res.json({ model })
}

const showImage = async (req = request, res = response) => {

    const { table, id } = req.params

    let model;

    switch (table) {
        case 'users':
            model = await User.findByPk(id);
            if (!model) {
                return res.status(404).json({ msg: `the user with id: ${id} does not exist in db` })
            }
            break;
        case 'items':
            model = await Item.findByPk(id);
            if (!model) {
                return res.status(404).json({ msg: `the item with id: ${id} does not exist in db` })
            }
            break

        default:
            res.status(500).json({ msg: 'forgot to validate it' })
    }

    if (model.image) {
        const imagePath = path.join(__dirname, '../uploads', table, model.image);
        if (fs.existsSync(imagePath)) {
            return res.sendFile(imagePath);
        }
    }

    const imagePath = path.join(__dirname, '../assets/426080.jpg');
    res.sendFile(imagePath);
}

module.exports = {
    loadFile,
    updateImage,
    showImage
}
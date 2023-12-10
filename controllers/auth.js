const { request, response } = require("express");
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const genJWT = require("../helpers/genJWB");


const login = async (req = request, res = response) => {

    const { name, password } = req.body;

    try {

        //user existence
        const user = await User.findOne({ where: { name: name } })

        if (!user) {
            return res.status(400).json({
                msg: 'Wrong User email/password  - email'
            })
        }

        //user is not deleted
        if (user.state === false) {
            return res.status(400).json({
                msg: 'Wrong email/password - state false'
            })
        }

        // password validation
        const validPassword = bcryptjs.compareSync(password, (user.dataValues.password));

        if (!validPassword) {
            return res.status(400).json({
                msg: 'wrong email/password - Wrong Password'
            });
        }

        // generate JWT
        const token = await genJWT(user.dataValues.id);

        res.status(200).json({
            msg: `The user ${user.dataValues.name} is logged in - Success`,
            token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Data Base error",
            error
        })
    }
}

module.exports = {
    login
}
const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user')

const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    //Token Validation
    if (!token) {
        return res.status(401).json({
            msg: 'No token passed'
        });
    }

    try {

        const { id } = jwt.verify(token, 'supersecret');

        const user = await User.findByPk(id);

        //User validation
        if (!user) {
            return res.status(401).json({
                msg: `the user ${user.dataValues.name} is not in the db`
            })
        }

        //State validation
        if (!user.dataValues.state) {
            return res.status(401).json({
                msg: `the user ${user.dataValues.name} is deleted from the db`
            })
        }

        const userData = user.dataValues

        req.user = userData

        next()


    } catch (error) {
        res.status(401).json({
            msg: 'Not Valid Token',
            err: error
        })

    }
}

module.exports = validateJWT
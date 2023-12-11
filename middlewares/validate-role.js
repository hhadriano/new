const { request, response } = require("express");


const isAdminRole = (req = request, res = response, next) => {

    if (!req.user) {
        return res.status(500).json({
            msg: 'Needs to validate the role'
        });
    }

    const { role, name } = req.user;

    if (role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `${name} is not the Admin - have not access`
        });
    }

    next()
}

const hasRole = (...roles) => {

    return (req = request, res = response, next) => {

        if (!req.user) {
            return res.status(500).json({
                msg: 'Needs to validate the role'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: `The service needs one of these roles ${roles}`
            })
        }
        next()
    }
}

module.exports = {
    isAdminRole,
    hasRole
}
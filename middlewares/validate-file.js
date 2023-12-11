const { request, response } = require("express");

const validateFile = (req = request, res = response, next) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            msg: `there's no files to upload.`
        });
    }
    next()
}

module.exports = validateFile;
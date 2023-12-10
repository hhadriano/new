const path = require('path');
const { v4: uuid } = require('uuid');

const uploadFile = (files, validExtensions = ['jpg', 'jpeg', 'png', 'gif'], folder = '') => {

    return new Promise((resolve, reject) => {
        const { file } = files;
        const splitName = file.name.split('.');
        const extension = splitName[splitName.length - 1];

        //Validation
        if (!validExtensions.includes(extension)) {
            return reject(`The extension ${extension} is not available, just ${validExtensions}`)
        }

        const tempName = uuid() + '.' + extension
        const uploadPath = path.join(__dirname, '../public/uploads', folder, tempName);

        file.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
            resolve(tempName);
        });
    })
}

module.exports = {
    uploadFile
}
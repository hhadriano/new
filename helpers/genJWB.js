const jwt = require('jsonwebtoken');

const genJWT = async (id = '') => {

    return new Promise((resolve, reject) => {

        const payload = { id };

        jwt.sign(payload, 'supersecret', {
            expiresIn: '30d'
        }, (err, token) => {

            if (err) {
                reject(`could not generate the token`);

            } else {
                resolve(token);
            }
        })

    })

}

module.exports = genJWT

const validateFields = require('./validate-field');
const validateJWT = require('./validate-jwt');
const { isAdminRole } = require('./validate-role');
const { hasRole } = require('./validate-role');
const validateFile = require('./validate-file')


module.exports = {
    validateFields,
    validateJWT,
    isAdminRole,
    hasRole,
    validateFile
}






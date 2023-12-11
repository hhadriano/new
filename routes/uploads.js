const { Router } = require("express");
const { loadFile, updateImage, showImage } = require("../controllers/uploads");
const { validateJWT, hasRole, isAdminRole, validateFields, validateFile } = require('../middlewares');
const { check } = require("express-validator");
const { availableTables } = require("../helpers/db-validators");

const router = Router();

router.get('/:table/:id', [
    check('table').custom(c => availableTables(c, ['users', 'items'])),
    check('id', 'needs to be uuid').isUUID(),
    validateFields
], showImage)

router.post('/', [
    // validateFile,
    // validateJWT,
    // hasRole(['ADMIN_ROLE', 'USER_ROLE']),
    // isAdminRole,
    validateFields
], loadFile);

router.put('/:table/:id', [
    validateFile,
    check('table').custom(c => availableTables(c, ['users', 'items'])),
    check('id', 'the id must must be uuid').isUUID(),
    validateFields
], updateImage);

module.exports = router;
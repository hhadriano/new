const { Router } = require("express");
const { check } = require("express-validator");

const { usersPost, userGet, updateUser, deleteUser } = require("../controllers/users");
const { isEmailValid, isRoleValid, existsUserById } = require("../helpers/db-validators");

const { validateJWT, validateFields, isAdminRole, hasRole } = require('../middlewares')

const router = Router();

router.get('/', userGet)

router.post('/', [

    check('name', 'A name is required').not().isEmpty().isAlpha(),
    check('email', 'the e-mail is required or you passed a wrong e-mail').isEmail(),
    check('email').custom(isEmailValid),
    check('password', 'password is required - More than 6 characters').isLength({ min: 6 }),
    //Validate role
    check('role').custom(isRoleValid),
    validateFields
], usersPost);

router.put('/:id', [
    //middlewares

    check('id', 'The ID is not valid').isUUID(),
    check('id').custom(existsUserById),
    check('role').custom(isRoleValid),
    validateJWT,
    hasRole('USER_ROLE', 'ADMIN_ROLE'),
    validateFields
], updateUser);

router.delete('/:id', [
    //middlewares

    validateJWT,
    // isAdminRole,
    hasRole('ADMIN_ROLE'),
    check('id', 'The ID is not valid').isUUID(),
    check('id').custom(existsUserById),
    validateFields
], deleteUser);

module.exports = router;
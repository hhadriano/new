const { Router } = require("express");
const { check } = require("express-validator");

const { login } = require("../controllers/auth");

const { validateFields } = require("../middlewares");


const router = Router();

router.post('/login', [
    check('name', 'The email is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields
], login)

module.exports = router;
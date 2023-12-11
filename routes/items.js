const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields, validateJWT, hasRole } = require('../middlewares')

const { getItem, postItem, putItem, deleteItem, getItemById } = require("../controllers/items");
const { existCategoryById } = require("../helpers/db-validators");

const router = Router();

// Public
router.get('/', getItem)

// Public
router.get('/:id', [
    check('id', 'need to pass the id').not().isEmpty(),
    check('id', 'need to be uuid type').isUUID(),
    validateFields
], getItemById)

// VENTAS_ROLE, ADMIN_ROLE
router.post('/', [
    // Middleware
    validateJWT,
    hasRole('VENTAS_ROLE', 'ADMIN_ROLE'),
    check('name', 'must passed name').not().isEmpty(),
    check('name', 'must be letters').isAlpha(),
    check('category_id', 'must passed the category_id').isUUID(),
    check('category_id').custom(existCategoryById),
    validateFields
], postItem)//

// VENTAS_ROLE, ADMIN_ROLE
router.put('/:id', putItem)

// ADMIN_ROLE
router.delete('/:id', deleteItem)

module.exports = router;
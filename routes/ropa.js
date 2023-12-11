const { Router } = require("express");
const { check } = require("express-validator");

const { validateFields, validateJWT, hasRole } = require('../middlewares')

const { existCategoryById } = require("../helpers/db-validators");

const router = Router();

// Public
router.get('/', getRopa)

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
], postRopa)//

// VENTAS_ROLE, ADMIN_ROLE
router.put('/:id', putRopa)

// ADMIN_ROLE
router.delete('/:id', deleteRopa)

module.exports = router;
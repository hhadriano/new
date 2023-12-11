const { Router } = require("express");
const { check } = require("express-validator");

const { postCategory, getCategories, getCategory, putCategory, deleteCategory } = require("../controllers/categories");
const { validateFields, validateJWT, hasRole, isAdminRole } = require("../middlewares");
const { existCategoryById } = require("../helpers/db-validators");


const router = Router();

//CRUD

//Public
router.get('/', getCategories);

//Public
router.get('/:id', [
    check('id', 'the id needs to be passed').not().isEmpty(),
    check('id', `the id is not allowed`).isUUID(),
    check('id').custom(existCategoryById),
    validateFields
], getCategory);

//Create a category - the Admin - private
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    validateJWT,
    hasRole('ADMIN_ROLE', 'USER_ROLE'),
    validateFields,
], postCategory)

//Update a category - Admin - private
router.put('/:id', [
    validateJWT,
    check('name', 'name must be passed').not().isEmpty(),
    check('id', 'is not a uuid').isUUID(),
    check('id').custom(existCategoryById),
    validateFields
], putCategory);

//Delete a category - Admin - private
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    check('id', 'is not a uuid').isUUID(),
    check('id').custom(existCategoryById),
    validateFields
], deleteCategory);

module.exports = router;
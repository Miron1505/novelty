const { Router } = require('express');
const { addCategory, deleteCategory, getCategoryById,getAllCategories } = require('../controllers/CategoryController');
const { createBusiness, editBusiness, deleteBusiness, getBusinessById, getBusinessByUserId, getBusinessByCategoryId, getAllBusinesses } = require('../controllers/BusinessController')

const router = Router();

// Categorias
router.post('/category/add', addCategory);
router.delete('/category/delete/:categoryId', deleteCategory);
router.get('/category/get/:categoryId', getCategoryById);
router.get('/category/all', getAllCategories);

// Negocios
router.post('/create', createBusiness);
router.put('/edit/:businessId', editBusiness);
router.delete('/delete/:businessId', deleteBusiness);
router.get('/get/:businessId', getBusinessById);
router.get('/get/mine/:userId', getBusinessByUserId);
router.get('/get/withcategory/:categoryId', getBusinessByCategoryId);
router.get('/all', getAllBusinesses);

module.exports = router;
const { Router } = require('express');
const { addClassification, deleteClassification, getAllClassifications } = require('../controllers/ClassificationController');
const { createProduct, editProduct, deleteProduct, getAllProducts, getProductByID, getAllProductsByBusinessId } = require('../controllers/ProductController');

const router = Router();

// Clasificaciones
router.post('/classification/add', addClassification);
router.delete('/classification/delete/:categoryId', deleteClassification);
router.get('/classification/all', getAllClassifications);


// Productos
router.post('/create', createProduct);
router.put('/edit/:productId', editProduct);
router.delete('/delete/:productId', deleteProduct);
router.get('/get/all', getAllProducts);
router.get('/get/:productId', getProductByID);
router.get('/get/all/business/:businessId', getAllProductsByBusinessId);

module.exports = router;
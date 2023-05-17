const express = require('express');
const { productController } = require('../controllers');

const router = express.Router();

router.get('/search', productController.search);
router.get('/', productController.getAll);
router.get('/:id', productController.findById);
router.post('/', productController.insert);
router.put('/:id', productController.update);
router.delete('/:id', productController.remove);

module.exports = router;
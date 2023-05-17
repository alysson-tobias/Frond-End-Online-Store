const express = require('express');
const { saleProductController } = require('../controllers');
const middlewares = require('../middlewares');

const router = express.Router();

router.post('/', saleProductController.insert);
router.get('/:id', saleProductController.findById);
router.get('/', saleProductController.getAll);
router.delete('/:id', saleProductController.remove);
router.put('/:id', middlewares.validateSale, saleProductController.update);

module.exports = router;
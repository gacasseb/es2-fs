const express = require('express');
const router = express.Router();
const controller = require('../controller/team');

router.get('/', controller.findAll);
router.post('/', controller.create);
router.get('/:id', controller.findOne);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
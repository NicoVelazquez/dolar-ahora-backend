const express = require('express');

const dolarController = require('../controllers/dollarController');

const router = express.Router();

router.get('/get', dolarController.getAll);

router.post('/update', dolarController.update);

module.exports = router;

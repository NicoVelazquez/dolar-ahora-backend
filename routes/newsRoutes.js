const express = require('express');
const newsController = require('../controllers/newsController');
const router = express.Router();

router.get('/get-top-economy', newsController.getTopEconomy);
router.get('/get-top-politic', newsController.getTopPolitic);


router.post('/add-economy', newsController.addEconomy);
router.post('/add-politic', newsController.addPolitic);

module.exports = router;
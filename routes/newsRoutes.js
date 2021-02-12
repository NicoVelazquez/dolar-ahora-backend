const express = require('express');
const newsController = require('../controllers/newsController');
const router = express.Router();

router.get('/get-economy/:results', newsController.getEconomyNews);
router.get('/get-politic/:results', newsController.getPoliticNews);

router.post('/add-economy', newsController.addEconomy);
router.post('/add-politic', newsController.addPolitic);

router.get('/get-economy/:page/:numberOfResults/:topResults', newsController.getEconomyPaginated);
router.get('/get-politic/:page/:numberOfResults/:topResults', newsController.getPoliticPaginated);

module.exports = router;

const express = require('express')
const router = express.Router();

const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.get('/csvView/:id', homeController.csvView);


router.post('/csvUpload/:id', homeController.csvUpload);
router.delete('/csvDelete/:id', homeController.csvDelete);

module.exports = router;
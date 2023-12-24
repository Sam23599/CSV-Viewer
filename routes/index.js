const express = require('express')
const router = express.Router();
const CSV = require('../models/files');

const homeController = require('../controllers/home_controller');

router.get('/', homeController.home);
router.get('/csvView/:id', homeController.csvView);


router.post('/csvUpload', CSV.uploadFile, homeController.csvUpload);
router.delete('/csvDelete/:id', homeController.csvDelete);

module.exports = router;
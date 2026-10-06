const router = require('express').Router();
const { translateText, getSupportedLanguages } = require('../controllers/translation.controller');

router.post('/translate', translateText);
router.get('/languages', getSupportedLanguages);

module.exports = router;

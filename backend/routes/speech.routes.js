const router = require('express').Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { translateSpeech } = require('../controllers/speech.controller');

router.post('/speech/translate', upload.single('audio'), translateSpeech);

module.exports = router;

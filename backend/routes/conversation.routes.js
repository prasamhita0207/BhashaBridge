const router = require('express').Router();
const { sendMessage } = require('../controllers/conversation.controller');

router.post('/conversation/message', sendMessage);

module.exports = router;

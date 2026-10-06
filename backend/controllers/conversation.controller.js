const Conversation = require('../models/Conversation');
const translationService = require('../services/translation.service');
const { demoMode } = require('../config/env');

async function sendMessage(req, res, next) {
  try {
    const { conversationId, speaker, text, languageA, languageB } = req.body;
    const targetLang = speaker === 'A' ? languageB : languageA;

    // Pull prior messages as context if we have a persisted conversation.
    let history = [];
    let conversation = null;
    if (!demoMode && conversationId) {
      conversation = await Conversation.findById(conversationId);
      history = (conversation?.messages || []).slice(-5).map(m => m.originalText);
    }

    const result = await translationService.translate({ text, targetLang, history, domain: 'Conversation' });

    if (!demoMode && req.user) {
      if (!conversation) {
        conversation = await Conversation.create({ userId: req.user.id, languageA, languageB, messages: [] });
      }
      conversation.messages.push({ speaker, originalText: text, translatedText: result.translation, context: result.context });
      await conversation.save();
    }

    res.json({ ...result, conversationId: conversation?._id });
  } catch (err) {
    next(err);
  }
}

module.exports = { sendMessage };

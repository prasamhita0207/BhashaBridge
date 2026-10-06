const translationService = require('../services/translation.service');
const languageService = require('../services/language.service');
const Translation = require('../models/Translation');

async function translateText(req, res, next) {
  try {
    const { text, sourceLang, targetLang, history, domain, tone, style } = req.body;
    const result = await translationService.translate({ text, sourceLang, targetLang, history, domain, tone, style });
    const clientId = req.headers['x-client-id'];
    let savedRecord = null;
    if (clientId) {
      savedRecord = await Translation.create({ clientId, sourceLanguage: result.sourceLanguage, targetLanguage: result.targetLanguage, originalText: result.originalText, translatedText: result.translation, transliteration: result.transliteration, context: result.context, tone: result.tone, domain, inputType: 'text', confidence: result.confidence });
    }
    res.json({ ...result, historyId: savedRecord?._id || null });
  } catch (err) { next(err); }
}
function getSupportedLanguages(req, res) { res.json(languageService.listSupportedLanguages()); }
module.exports = { translateText, getSupportedLanguages };

const speechService = require('../services/speech.service');
const translationService = require('../services/translation.service');

async function translateSpeech(req, res, next) {
  try {
    const { targetLang, sourceLang } = req.body;
    const audioBuffer = req.file ? req.file.buffer : null;
    const transcript = await speechService.speechToText(audioBuffer, sourceLang);
    const result = await translationService.translate({
      text: transcript.text,
      sourceLang: transcript.detectedLanguage,
      targetLang,
    });
    const tts = await speechService.textToSpeech(result.translation, targetLang);
    res.json({ ...result, audio: tts });
  } catch (err) {
    next(err);
  }
}

module.exports = { translateSpeech };

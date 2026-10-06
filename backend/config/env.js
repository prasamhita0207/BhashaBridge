require('dotenv').config();
module.exports = {
  port: Number(process.env.PORT || 5000),
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5000',
  demoMode: process.env.DEMO_MODE === 'true',
  jwtSecret: process.env.JWT_SECRET || 'dev_only_secret_change_me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  maxFileSizeMb: Number(process.env.MAX_FILE_SIZE_MB || 10),
  ai: {
    groqApiKey: process.env.GROQ_API_KEY,
    groqModel: process.env.GROQ_MODEL || 'openai/gpt-oss-120b',
    translationApiKey: process.env.TRANSLATION_API_KEY,
    translationApiUrl: process.env.TRANSLATION_API_URL,
    speechToTextKey: process.env.SPEECH_TO_TEXT_API_KEY,
    textToSpeechKey: process.env.TEXT_TO_SPEECH_API_KEY,
    ocrApiKey: process.env.OCR_API_KEY,
    contextApiKey: process.env.LLM_CONTEXT_API_KEY,
    contextApiUrl: process.env.LLM_CONTEXT_API_URL,
  },
};

const { demoMode } = require('../config/env');
const languageService = require('./language.service');
const contextService = require('./context.service');
const groq = require('./groq.service');

const LANGUAGE_NAMES = Object.fromEntries(languageService.SUPPORTED_LANGUAGES.map(x => [x.code, x.name]));

async function translateWithAI({ text, sourceLanguage, targetLanguage, history, domain, tone, style, context }) {
  const sourceName = LANGUAGE_NAMES[sourceLanguage] || sourceLanguage;
  const targetName = LANGUAGE_NAMES[targetLanguage] || targetLanguage;
  const raw = await groq.chat([
    {
      role: 'system',
      content: `You are BhashaBridge, a professional context-aware translation engine for Indian languages. Translate naturally, preserve intent, names, numbers and meaning, and avoid word-for-word phrasing when unnatural. Return only JSON with exactly: translation, transliteration, explanation, meaning, confidence. transliteration must be Roman-script pronunciation of the translated text; for English it may be empty.`,
    },
    {
      role: 'user',
      content: JSON.stringify({ sourceLanguage: sourceName, targetLanguage: targetName, text, history: history.slice(-8), domain, tone, style, context }),
    },
  ], { temperature: 0.2, maxTokens: 1200, responseFormat: { type: 'json_object' } });

  let x;
  try { x = JSON.parse(raw); } catch { x = { translation: raw, transliteration: '', explanation: 'AI translation generated successfully.', meaning: raw, confidence: 0.85 }; }
  return {
    translation: x.translation || raw,
    transliteration: x.transliteration || '',
    explanation: x.explanation || 'The translation preserves the requested context, tone and style.',
    meaning: x.meaning || text,
    confidence: Number(Math.min(1, Math.max(0, Number(x.confidence) || 0.85)).toFixed(2)),
  };
}

async function translate({ text, sourceLang = 'auto', targetLang, history = [], domain = 'General', tone = 'Neutral', style = 'Natural' }) {
  if (!text || !targetLang) { const e = new Error('text and targetLang are required.'); e.status = 400; throw e; }
  const detected = sourceLang === 'auto' ? await languageService.detectLanguage(text) : { language: sourceLang, confidence: 1 };
  const context = await contextService.analyzeContext({ text, history, domain, tone, style });

  if (demoMode) {
    return { sourceLanguage: detected.language, targetLanguage: targetLang, originalText: text, translation: text, transliteration: '', context: context.detectedContext, tone: context.tone, confidence: 0.9, explanation: 'Demo mode is enabled.', meaning: text };
  }

  const ai = await translateWithAI({ text, sourceLanguage: detected.language, targetLanguage: targetLang, history: Array.isArray(history) ? history : [], domain, tone, style, context });
  return { sourceLanguage: detected.language, targetLanguage: targetLang, originalText: text, ...ai, context: context.detectedContext, tone: context.tone };
}
module.exports = { translate };

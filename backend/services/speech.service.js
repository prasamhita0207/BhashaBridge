/**
 * speech.service
 * Speech-to-text and text-to-speech. Swap the bodies with a real provider
 * (e.g. Google Speech-to-Text/TTS, Azure Speech, Bhashini ASR/TTS).
 */
const { demoMode } = require('../config/env');

async function speechToText(audioBuffer, langCode = 'auto') {
  if (demoMode) {
    return { text: 'Where is the nearest railway station?', detectedLanguage: 'en', confidence: 0.95 };
  }
  // TODO: send audioBuffer to a real ASR provider.
  throw new Error('Speech-to-text provider not configured.');
}

async function textToSpeech(text, langCode) {
  if (demoMode) {
    return { audioUrl: null, note: 'Demo mode: no audio file generated.' };
  }
  // TODO: send text to a real TTS provider and return a playable audio URL.
  throw new Error('Text-to-speech provider not configured.');
}

module.exports = { speechToText, textToSpeech };

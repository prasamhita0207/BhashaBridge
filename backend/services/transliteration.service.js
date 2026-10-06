/**
 * transliteration.service
 * Converts native-script text to Roman transliteration and back.
 * Swap with a real transliteration engine (e.g. Google Input Tools API,
 * IndicTrans, Aksharamukha) when available.
 */
const { demoMode } = require('../config/env');

async function transliterate(nativeText, langCode) {
  if (demoMode) {
    return `[roman transliteration of: ${nativeText}]`;
  }
  // TODO: call a real transliteration provider keyed by langCode.
  throw new Error('Transliteration provider not configured.');
}

module.exports = { transliterate };

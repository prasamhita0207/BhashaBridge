const { demoMode } = require('../config/env');
const groq = require('./groq.service');

async function analyzeContext({ text, history = [], domain = 'General', tone = 'Neutral', style = 'Natural' }) {
  if (!text) return { detectedContext: domain, tone, style, meaning: '', confidence: 1, explanation: '' };

  if (demoMode) {
    return { detectedContext: domain, tone, style, meaning: text, confidence: 0.9, explanation: 'Demo mode context analysis.' };
  }

  const messages = [
    { role: 'system', content: 'You are the BhashaBridge context engine. Return only JSON with detectedContext, tone, style, meaning, confidence, explanation. Infer context from the text and recent conversation. Never invent facts.' },
    { role: 'user', content: JSON.stringify({ text, history: Array.isArray(history) ? history.slice(-8) : [], domain, tone, style }) },
  ];

  const raw = await groq.chat(messages, { temperature: 0.1, maxTokens: 500, responseFormat: { type: 'json_object' } });
  try {
    const x = JSON.parse(raw);
    return {
      detectedContext: x.detectedContext || domain,
      tone: x.tone || tone,
      style: x.style || style,
      meaning: x.meaning || text,
      confidence: Math.min(1, Math.max(0, Number(x.confidence) || 0.9)),
      explanation: x.explanation || 'Context was inferred from the message and conversation history.',
    };
  } catch {
    return { detectedContext: domain, tone, style, meaning: text, confidence: 0.85, explanation: 'Context was inferred from the selected settings.' };
  }
}
module.exports = { analyzeContext };

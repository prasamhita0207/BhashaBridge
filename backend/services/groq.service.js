const Groq = require('groq-sdk');

function getClient() {
  if (!process.env.GROQ_API_KEY) {
    throw new Error('GROQ_API_KEY is not configured in backend/.env');
  }
  return new Groq({ apiKey: process.env.GROQ_API_KEY });
}

async function chat(messages, options = {}) {
  const groq = getClient();
  const completion = await groq.chat.completions.create({
    model: process.env.GROQ_MODEL || 'openai/gpt-oss-120b',
    messages,
    temperature: options.temperature ?? 0.2,
    max_tokens: options.maxTokens ?? 1200,
    ...(options.responseFormat ? { response_format: options.responseFormat } : {}),
  });
  return completion.choices?.[0]?.message?.content?.trim() || '';
}

module.exports = { chat };

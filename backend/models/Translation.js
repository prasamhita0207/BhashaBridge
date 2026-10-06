const mongoose = require('mongoose');
const translationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  clientId: { type: String, index: true },
  sourceLanguage: { type: String, required: true },
  targetLanguage: { type: String, required: true },
  originalText: { type: String, required: true },
  translatedText: { type: String, required: true },
  transliteration: { type: String },
  context: { type: String, default: 'General' },
  tone: { type: String, default: 'Neutral' },
  domain: { type: String },
  inputType: { type: String, enum: ['text', 'speech', 'image', 'document'], default: 'text' },
  confidence: { type: Number },
  saved: { type: Boolean, default: false },
}, { timestamps: true });
module.exports = mongoose.model('Translation', translationSchema);

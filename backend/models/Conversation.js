const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  speaker: { type: String, enum: ['A', 'B'], required: true },
  originalText: { type: String, required: true },
  translatedText: { type: String, required: true },
  context: { type: String },
}, { timestamps: true });

const conversationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  languageA: { type: String, required: true },
  languageB: { type: String, required: true },
  messages: [messageSchema],
}, { timestamps: true });

module.exports = mongoose.model('Conversation', conversationSchema);

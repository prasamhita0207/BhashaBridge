const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String }, // absent for OAuth-only accounts
  googleId: { type: String },
  profileImage: { type: String },
  preferences: {
    sourceLanguage: { type: String, default: 'auto' },
    targetLanguage: { type: String, default: 'hi' },
    defaultTone: { type: String, default: 'Neutral' },
    defaultContext: { type: String, default: 'General' },
    autoTransliteration: { type: Boolean, default: true },
    fontSize: { type: String, default: 'medium' },
    highContrast: { type: Boolean, default: false },
    reducedMotion: { type: Boolean, default: false },
  },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

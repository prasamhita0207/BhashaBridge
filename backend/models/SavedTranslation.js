const mongoose = require('mongoose');

const savedTranslationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  translationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Translation', required: true },
}, { timestamps: true });

module.exports = mongoose.model('SavedTranslation', savedTranslationSchema);

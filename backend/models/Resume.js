const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resumeText: { type: String, required: true },
  atsScore:   { type: Number },
  atsSummary: { type: String },
  strengths:  [String],
  weaknesses: [String],
  missingSkills: [String],
  suggestedRoles: [String],
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
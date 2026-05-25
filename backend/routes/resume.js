const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require('../middleware/auth');
const Resume = require('../models/Resume');

console.log('GROQ KEY:', process.env.GROQ_API_KEY ? 'loaded' : 'MISSING');

router.post('/analyze', auth, async (req, res) => {
  const { resumeText } = req.body;
  if (!resumeText) return res.status(400).json({ message: 'Resume text is required' });

  try {
    const prompt = `You are an expert ATS resume analyzer. Analyze the resume below and return ONLY valid JSON, no explanation, no markdown.

Resume:
"""
${resumeText.slice(0, 3000)}
"""

Return exactly this JSON structure:
{
  "ats_score": <integer 0-100>,
  "ats_summary": "<1 sentence>",
  "strengths": ["<s1>","<s2>","<s3>","<s4>"],
  "weaknesses": ["<w1>","<w2>","<w3>","<w4>"],
  "missing_skills": ["<sk1>","<sk2>","<sk3>","<sk4>","<sk5>"],
  "suggested_roles": ["<r1>","<r2>","<r3>","<r4>","<r5>"]
}`;

    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const raw = response.data.choices[0].message.content.trim();
    const parsed = JSON.parse(raw.replace(/```json|```/g, '').trim());

    const saved = await Resume.create({
      user: req.user.id,
      resumeText,
      atsScore: parsed.ats_score,
      atsSummary: parsed.ats_summary,
      strengths: parsed.strengths,
      weaknesses: parsed.weaknesses,
      missingSkills: parsed.missing_skills,
      suggestedRoles: parsed.suggested_roles,
    });

    res.json(saved);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ message: 'Analysis failed' });
  }
});

router.get('/history', auth, async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(resumes);
  } catch (err) {
     console.error('FULL ERROR:', err.response?.data || err.message);
      res.status(500).json({ message: 'Analysis failed' });
  }
});

module.exports = router;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/axios';

const Analyze = () => {
  const navigate = useNavigate();
  const [resumeText, setResumeText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!resumeText.trim() || resumeText.length < 50) {
      setError('Please paste your resume text (at least a few sentences).');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const { data } = await API.post('/resume/analyze', { resumeText });
      navigate('/results', { state: { result: data } });
    } catch (err) {
      setError('Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>
      <div style={s.container}>

        <div style={s.header}>
          <h1 style={s.title}>Analyze your resume</h1>
          <p style={s.sub}>Paste your resume below and get instant AI feedback</p>
        </div>

        <div style={s.card}>
          <label style={s.label}>Resume text</label>
          <textarea
            style={s.textarea}
            placeholder="Paste your full resume here...&#10;&#10;John Doe&#10;Software Engineer | john@email.com&#10;&#10;Experience..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            rows={16}
          />
          <div style={s.meta}>
            <span style={s.charCount}>{resumeText.length} characters</span>
          </div>

          {error && <div style={s.error}>{error}</div>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{ ...s.btn, opacity: loading ? 0.6 : 1 }}
          >
            {loading ? (
              <span>Analyzing your resume...</span>
            ) : (
              <span>Analyze resume →</span>
            )}
          </button>

          {loading && (
            <div style={s.loadingHint}>
              This usually takes 5–10 seconds
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

const s = {
  page: { background: '#fafaf8', minHeight: '100vh', padding: '2.5rem 1rem' },
  container: { maxWidth: '720px', margin: '0 auto' },
  header: { marginBottom: '1.75rem' },
  title: {
    fontFamily: "'Instrument Serif', serif", fontSize: '1.75rem',
    color: '#1a1a1a', letterSpacing: '-0.02em', marginBottom: '0.25rem',
  },
  sub: { fontSize: '0.9rem', color: '#888' },
  card: {
    background: '#fff', border: '1px solid #e8e6e1',
    borderRadius: '16px', padding: '2rem',
  },
  label: { display: 'block', fontSize: '0.825rem', fontWeight: '600', color: '#444', marginBottom: '0.6rem' },
  textarea: {
    width: '100%', padding: '1rem', fontSize: '0.9rem',
    border: '1px solid #e0ddd8', borderRadius: '10px',
    background: '#fafaf8', color: '#1a1a1a', outline: 'none',
    resize: 'vertical', lineHeight: 1.7, fontFamily: 'inherit',
  },
  meta: { display: 'flex', justifyContent: 'flex-end', marginTop: '0.4rem', marginBottom: '1rem' },
  charCount: { fontSize: '0.78rem', color: '#bbb' },
  error: {
    background: '#fef2f2', border: '1px solid #fecaca',
    color: '#b91c1c', borderRadius: '8px',
    padding: '0.75rem 1rem', fontSize: '0.875rem', marginBottom: '1rem',
  },
  btn: {
    width: '100%', padding: '0.85rem',
    background: '#1a1a1a', color: '#fafaf8',
    border: 'none', borderRadius: '8px',
    fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer',
  },
  loadingHint: { textAlign: 'center', fontSize: '0.8rem', color: '#aaa', marginTop: '0.75rem' },
};

export default Analyze;
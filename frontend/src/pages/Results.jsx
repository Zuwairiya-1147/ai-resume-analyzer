import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';

const Results = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const result = state?.result;

  useEffect(() => {
    if (!result) navigate('/analyze');
  }, [result, navigate]);

  if (!result) return null;

  const getScoreColor = (score) => {
    if (score >= 75) return '#16a34a';
    if (score >= 50) return '#d97706';
    return '#dc2626';
  };

  const getScoreLabel = (score) => {
    if (score >= 75) return 'Strong resume';
    if (score >= 50) return 'Needs improvement';
    return 'Needs significant work';
  };

  return (
    <div style={s.page}>
      <div style={s.container}>

        {/* Header */}
        <div style={s.header}>
          <h1 style={s.title}>Your results</h1>
          <div style={s.headerBtns}>
            <Link to="/analyze" style={s.ghostBtn}>Analyze another</Link>
            <Link to="/dashboard" style={s.btn}>Go to dashboard</Link>
          </div>
        </div>

        {/* ATS Score */}
        <div style={s.scoreCard}>
          <div style={s.scoreLeft}>
            <div style={{ ...s.scoreBig, color: getScoreColor(result.atsScore) }}>
              {result.atsScore}
              <span style={s.scoreOf}>/100</span>
            </div>
            <div style={{ ...s.scoreLabel, color: getScoreColor(result.atsScore) }}>
              {getScoreLabel(result.atsScore)}
            </div>
          </div>
          <div style={s.scoreRight}>
            <div style={s.atsTitle}>ATS Score</div>
            <p style={s.atsSummary}>{result.atsSummary}</p>
            <div style={s.scoreBar}>
              <div style={{
                ...s.scoreBarFill,
                width: `${result.atsScore}%`,
                background: getScoreColor(result.atsScore),
              }} />
            </div>
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        <div style={s.grid2}>
          <div style={s.card}>
            <h2 style={{ ...s.cardTitle, color: '#16a34a' }}>
              ✓ Strengths
            </h2>
            <ul style={s.list}>
              {result.strengths.map((item, i) => (
                <li key={i} style={s.listItem}>
                  <span style={{ ...s.dot, background: '#16a34a' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div style={s.card}>
            <h2 style={{ ...s.cardTitle, color: '#dc2626' }}>
              ✕ Weaknesses
            </h2>
            <ul style={s.list}>
              {result.weaknesses.map((item, i) => (
                <li key={i} style={s.listItem}>
                  <span style={{ ...s.dot, background: '#dc2626' }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Missing Skills */}
        <div style={s.card}>
          <h2 style={{ ...s.cardTitle, color: '#d97706' }}>
            ⚠ Missing skills
          </h2>
          <div style={s.skillTags}>
            {result.missingSkills.map((skill, i) => (
              <span key={i} style={s.skillTag}>{skill}</span>
            ))}
          </div>
        </div>

        {/* Suggested Roles */}
        <div style={s.card}>
          <h2 style={{ ...s.cardTitle, color: '#1a1a1a' }}>
            💼 Suggested job roles
          </h2>
          <div style={s.roleGrid}>
            {result.suggestedRoles.map((role, i) => (
              <div key={i} style={s.roleCard}>
                <div style={s.roleNum}>{i + 1}</div>
                <div style={s.roleName}>{role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={s.cta}>
          <p style={s.ctaText}>Want to improve your score? Update your resume and analyze again.</p>
          <Link to="/analyze" style={s.btn}>Analyze again →</Link>
        </div>

      </div>
    </div>
  );
};

const s = {
  page: { background: '#fafaf8', minHeight: '100vh', padding: '2.5rem 1rem' },
  container: { maxWidth: '860px', margin: '0 auto' },

  header: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem',
  },
  title: {
    fontFamily: "'Instrument Serif', serif", fontSize: '1.75rem',
    color: '#1a1a1a', letterSpacing: '-0.02em',
  },
  headerBtns: { display: 'flex', gap: '0.75rem' },
  btn: {
    background: '#1a1a1a', color: '#fafaf8', padding: '0.65rem 1.4rem',
    borderRadius: '8px', fontSize: '0.875rem', fontWeight: '600', textDecoration: 'none',
  },
  ghostBtn: {
    background: '#fff', color: '#1a1a1a', padding: '0.65rem 1.4rem',
    borderRadius: '8px', fontSize: '0.875rem', fontWeight: '500',
    border: '1px solid #e0ddd8', textDecoration: 'none',
  },

  scoreCard: {
    background: '#fff', border: '1px solid #e8e6e1', borderRadius: '16px',
    padding: '2rem', display: 'flex', gap: '2rem',
    alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap',
  },
  scoreLeft: { textAlign: 'center', minWidth: '100px' },
  scoreBig: {
    fontFamily: "'Instrument Serif', serif",
    fontSize: '3.5rem', fontWeight: '700', lineHeight: 1,
  },
  scoreOf: { fontSize: '1.2rem', color: '#bbb' },
  scoreLabel: { fontSize: '0.78rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: '0.4rem' },
  scoreRight: { flex: 1 },
  atsTitle: { fontSize: '0.78rem', fontWeight: '600', color: '#999', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' },
  atsSummary: { fontSize: '1rem', color: '#444', lineHeight: 1.6, marginBottom: '1rem' },
  scoreBar: { height: '6px', background: '#f0ede8', borderRadius: '999px', overflow: 'hidden' },
  scoreBarFill: { height: '100%', borderRadius: '999px', transition: 'width 1s ease' },

  grid2: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '1rem' },
  card: {
    background: '#fff', border: '1px solid #e8e6e1',
    borderRadius: '16px', padding: '1.5rem', marginBottom: '1rem',
  },
  cardTitle: { fontSize: '0.95rem', fontWeight: '700', marginBottom: '1rem' },
  list: { listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  listItem: { display: 'flex', alignItems: 'flex-start', gap: '0.6rem', fontSize: '0.9rem', color: '#444', lineHeight: 1.5 },
  dot: { width: 8, height: 8, borderRadius: '50%', flexShrink: 0, marginTop: '5px' },

  skillTags: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem' },
  skillTag: {
    fontSize: '0.85rem', color: '#92400e', background: '#fffbeb',
    border: '1px solid #fde68a', padding: '0.35rem 0.85rem', borderRadius: '999px', fontWeight: '500',
  },

  roleGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem' },
  roleCard: {
    background: '#fafaf8', border: '1px solid #e8e6e1',
    borderRadius: '10px', padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem',
  },
  roleNum: {
    width: 28, height: 28, borderRadius: '50%', background: '#1a1a1a',
    color: '#fff', fontSize: '0.75rem', fontWeight: '700',
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  roleName: { fontSize: '0.85rem', fontWeight: '500', color: '#1a1a1a' },

  cta: {
    textAlign: 'center', padding: '2rem',
    borderTop: '1px solid #e8e6e1', marginTop: '1rem',
  },
  ctaText: { fontSize: '0.9rem', color: '#888', marginBottom: '1rem' },
};

export default Results;
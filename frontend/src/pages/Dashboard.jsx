import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../services/axios';

const Dashboard = () => {
  const { user } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data } = await API.get('/resume/history');
        setResumes(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const getScoreColor = (score) => {
    if (score >= 75) return '#16a34a';
    if (score >= 50) return '#d97706';
    return '#dc2626';
  };

  const getScoreLabel = (score) => {
    if (score >= 75) return 'Strong';
    if (score >= 50) return 'Average';
    return 'Weak';
  };

  return (
    <div style={s.page}>
      <div style={s.container}>

        {/* Header */}
        <div style={s.header}>
          <div>
            <h1 style={s.title}>Welcome back, {user?.name} 👋</h1>
            <p style={s.sub}>Here's your resume analysis history</p>
          </div>
          <Link to="/analyze" style={s.btn}>+ Analyze new resume</Link>
        </div>

        {/* Stats */}
        <div style={s.stats}>
          <div style={s.statCard}>
            <div style={s.statNum}>{resumes.length}</div>
            <div style={s.statLabel}>Resumes analyzed</div>
          </div>
          <div style={s.statCard}>
            <div style={s.statNum}>
              {resumes.length > 0
                ? Math.round(resumes.reduce((a, r) => a + r.atsScore, 0) / resumes.length)
                : 0}
            </div>
            <div style={s.statLabel}>Average ATS score</div>
          </div>
          <div style={s.statCard}>
            <div style={s.statNum}>
              {resumes.length > 0 ? Math.max(...resumes.map(r => r.atsScore)) : 0}
            </div>
            <div style={s.statLabel}>Best ATS score</div>
          </div>
        </div>

        {/* History */}
        {loading ? (
          <div style={s.empty}>Loading...</div>
        ) : resumes.length === 0 ? (
          <div style={s.emptyCard}>
            <div style={s.emptyIcon}>📄</div>
            <h3 style={s.emptyTitle}>No resumes yet</h3>
            <p style={s.emptySub}>Analyze your first resume to see results here</p>
            <Link to="/analyze" style={s.btn}>Analyze my resume</Link>
          </div>
        ) : (
          <div style={s.list}>
            {resumes.map((r) => (
              <div key={r._id} style={s.card}>
                <div style={s.cardLeft}>
                  <div style={{ ...s.score, color: getScoreColor(r.atsScore) }}>
                    {r.atsScore}
                  </div>
                  <div style={{ ...s.scoreLabel, color: getScoreColor(r.atsScore) }}>
                    {getScoreLabel(r.atsScore)}
                  </div>
                </div>
                <div style={s.cardMiddle}>
                  <p style={s.atsSummary}>{r.atsSummary}</p>
                  <div style={s.tags}>
                    {r.suggestedRoles.slice(0, 3).map((role) => (
                      <span key={role} style={s.tag}>{role}</span>
                    ))}
                  </div>
                </div>
                <div style={s.cardRight}>
                  <div style={s.date}>
                    {new Date(r.createdAt).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric'
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

const s = {
  page: { background: '#fafaf8', minHeight: '100vh', padding: '2.5rem 1rem' },
  container: { maxWidth: '860px', margin: '0 auto' },

  header: {
    display: 'flex', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem',
  },
  title: {
    fontFamily: "'Instrument Serif', serif", fontSize: '1.75rem',
    color: '#1a1a1a', letterSpacing: '-0.02em', marginBottom: '0.25rem',
  },
  sub: { fontSize: '0.9rem', color: '#888' },
  btn: {
    background: '#1a1a1a', color: '#fafaf8', padding: '0.65rem 1.4rem',
    borderRadius: '8px', fontSize: '0.9rem', fontWeight: '600',
    textDecoration: 'none', whiteSpace: 'nowrap',
  },

  stats: {
    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1rem', marginBottom: '2rem',
  },
  statCard: {
    background: '#fff', border: '1px solid #e8e6e1',
    borderRadius: '12px', padding: '1.25rem',
  },
  statNum: {
    fontFamily: "'Instrument Serif', serif", fontSize: '2.2rem',
    color: '#1a1a1a', lineHeight: 1,
  },
  statLabel: { fontSize: '0.8rem', color: '#888', marginTop: '0.4rem' },

  empty: { textAlign: 'center', color: '#888', padding: '3rem' },
  emptyCard: {
    background: '#fff', border: '1px solid #e8e6e1', borderRadius: '16px',
    padding: '3rem', textAlign: 'center',
  },
  emptyIcon: { fontSize: '2.5rem', marginBottom: '1rem' },
  emptyTitle: { fontSize: '1.1rem', fontWeight: '600', color: '#1a1a1a', marginBottom: '0.5rem' },
  emptySub: { fontSize: '0.9rem', color: '#888', marginBottom: '1.5rem' },

  list: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
  card: {
    background: '#fff', border: '1px solid #e8e6e1', borderRadius: '12px',
    padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem',
  },
  cardLeft: { textAlign: 'center', minWidth: '50px' },
  score: { fontSize: '1.75rem', fontWeight: '700', lineHeight: 1 },
  scoreLabel: { fontSize: '0.72rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' },
  cardMiddle: { flex: 1 },
  atsSummary: { fontSize: '0.9rem', color: '#444', marginBottom: '0.6rem', lineHeight: 1.5 },
  tags: { display: 'flex', gap: '0.4rem', flexWrap: 'wrap' },
  tag: {
    fontSize: '0.75rem', color: '#666', background: '#f3f2ef',
    border: '1px solid #e8e6e1', padding: '0.2rem 0.6rem', borderRadius: '999px',
  },
  cardRight: { textAlign: 'right' },
  date: { fontSize: '0.8rem', color: '#aaa' },
};

export default Dashboard;
import { Link } from 'react-router-dom';

const features = [
  { icon: '🎯', title: 'ATS Score',      desc: 'See exactly how recruiter systems rate your resume.' },
  { icon: '💪', title: 'Strengths',      desc: "Know what's already making you stand out." },
  { icon: '⚠️', title: 'Weaknesses',    desc: 'Fix the gaps holding your application back.' },
  { icon: '🛠️', title: 'Missing skills', desc: 'Add what hiring managers actually look for.' },
  { icon: '💼', title: 'Job matches',    desc: 'Get matched to roles that fit your profile.' },
  { icon: '📊', title: 'History',        desc: 'Track how your resume improves over time.' },
];

const Landing = () => (
  <div style={s.page}>

    {/* Hero */}
    <section style={s.hero}>
      <div style={s.tag}>
        <span style={s.dot} />
        AI-powered · Free to start
      </div>
      <h1 style={s.h1}>
        Your resume,<br />
        <em style={s.em}>finally</em> working for you
      </h1>
      <p style={s.sub}>
        Paste your resume and get an instant ATS score, skill gaps,
        and job matches — in seconds.
      </p>
      <div style={s.btns}>
        <Link to="/register" style={s.btnPrimary}>Analyze my resume →</Link>
        <Link to="/login"    style={s.btnGhost}>Login</Link>
      </div>
    </section>

    {/* Features */}
    <section style={s.features}>
      <p style={s.label}>What you get</p>
      <div style={s.grid}>
        {features.map((f) => (
          <div key={f.title} style={s.card}>
            <div style={s.icon}>{f.icon}</div>
            <div style={s.cardTitle}>{f.title}</div>
            <div style={s.cardDesc}>{f.desc}</div>
          </div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section style={s.cta}>
      <h2 style={s.ctaH2}>Ready to get hired?</h2>
      <p style={s.ctaSub}>It takes 30 seconds. No credit card needed.</p>
      <Link to="/register" style={s.btnPrimary}>Analyze my resume →</Link>
    </section>

  </div>
);

const s = {
  page: { background: '#fafaf8', minHeight: '100vh' },
  hero: { padding: '5rem 2rem 3rem', textAlign: 'center', maxWidth: '680px', margin: '0 auto' },
  tag: {
    display: 'inline-flex', alignItems: 'center', gap: '6px',
    fontSize: '0.78rem', color: '#666', border: '1px solid #e0ddd8',
    padding: '0.3rem 0.8rem', borderRadius: '999px', marginBottom: '1.75rem', background: '#fff',
  },
  dot: { width: 6, height: 6, background: '#4ade80', borderRadius: '50%', display: 'inline-block' },
  h1: {
    fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
    lineHeight: 1.1, letterSpacing: '-0.02em', color: '#1a1a1a', marginBottom: '1.25rem',
  },
  em:  { fontStyle: 'italic', color: '#c17d3c' },
  sub: { fontSize: '1rem', color: '#666', lineHeight: 1.7, maxWidth: '460px', margin: '0 auto 2rem' },
  btns: { display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' },
  btnPrimary: {
    background: '#1a1a1a', color: '#fafaf8', padding: '0.7rem 1.6rem',
    borderRadius: '8px', fontSize: '0.95rem', fontWeight: '600',
  },
  btnGhost: {
    background: '#fff', color: '#1a1a1a', padding: '0.7rem 1.6rem',
    borderRadius: '8px', fontSize: '0.95rem', fontWeight: '500',
    border: '1px solid #e0ddd8',
  },
  proofText: { fontSize: '0.8rem', color: '#999' },

  features: { padding: '2rem 2rem 3rem', maxWidth: '900px', margin: '0 auto' },
  label: {
    fontSize: '0.72rem', fontWeight: '600', letterSpacing: '0.08em',
    textTransform: 'uppercase', color: '#999', textAlign: 'center', marginBottom: '1.5rem',
  },
  grid: {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '1px',
  background: '#e8e6e1',
  border: '1px solid #e8e6e1',
  borderRadius: '12px',
  overflow: 'hidden',
},
  card: { background: '#fafaf8', padding: '1.25rem' },
  icon: { fontSize: '1.1rem', marginBottom: '0.6rem' },
  cardTitle: { fontSize: '0.9rem', fontWeight: '600', color: '#1a1a1a', marginBottom: '0.3rem' },
  cardDesc:  { fontSize: '0.8rem', color: '#888', lineHeight: 1.5 },

  cta: { textAlign: 'center', padding: '3rem 2rem 5rem', borderTop: '1px solid #e8e6e1' },
  ctaH2: { fontFamily: "'Instrument Serif', serif", fontSize: '2rem', color: '#1a1a1a', marginBottom: '0.5rem', letterSpacing: '-0.01em' },
  ctaSub: { fontSize: '0.9rem', color: '#888', marginBottom: '1.5rem' },
};

export default Landing;
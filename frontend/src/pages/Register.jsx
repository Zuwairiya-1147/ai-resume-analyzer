import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../services/axios';

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await API.post('/auth/register', form);
      login(data.user, data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>
      <div style={s.card}>

        <div style={s.top}>
          <h1 style={s.title}>Create your account</h1>
          <p style={s.sub}>Start analyzing your resume for free</p>
        </div>

        {error && <div style={s.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={s.form}>
          <div style={s.field}>
            <label style={s.label}>Full name</label>
            <input
              name="name"
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              required
              style={s.input}
            />
          </div>

          <div style={s.field}>
            <label style={s.label}>Email</label>
            <input
              name="email"
              type="email"
              placeholder="john@email.com"
              value={form.email}
              onChange={handleChange}
              required
              style={s.input}
            />
          </div>

          <div style={s.field}>
            <label style={s.label}>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Min. 8 characters"
              value={form.password}
              onChange={handleChange}
              required
              style={s.input}
            />
          </div>

          <button type="submit" style={s.btn} disabled={loading}>
            {loading ? 'Creating account...' : 'Create account →'}
          </button>
        </form>

        <p style={s.footer}>
          Already have an account?{' '}
          <Link to="/login" style={s.footerLink}>Log in</Link>
        </p>

      </div>
    </div>
  );
};

const s = {
  page: {
    minHeight: '100vh', background: '#fafaf8',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '2rem 1rem',
  },
  card: {
    background: '#fff', border: '1px solid #e8e6e1',
    borderRadius: '16px', padding: '2.5rem',
    width: '100%', maxWidth: '420px',
  },
  top: { marginBottom: '1.75rem' },
  title: {
    fontFamily: "'Instrument Serif', serif",
    fontSize: '1.75rem', color: '#1a1a1a',
    letterSpacing: '-0.02em', marginBottom: '0.35rem',
  },
  sub: { fontSize: '0.9rem', color: '#888' },
  error: {
    background: '#fef2f2', border: '1px solid #fecaca',
    color: '#b91c1c', borderRadius: '8px',
    padding: '0.75rem 1rem', fontSize: '0.875rem', marginBottom: '1.25rem',
  },
  form: { display: 'flex', flexDirection: 'column', gap: '1.1rem' },
  field: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  label: { fontSize: '0.825rem', fontWeight: '600', color: '#444' },
  input: {
    padding: '0.7rem 0.9rem', fontSize: '0.95rem',
    border: '1px solid #e0ddd8', borderRadius: '8px',
    background: '#fafaf8', color: '#1a1a1a', outline: 'none',
    transition: 'border-color 0.15s',
  },
  btn: {
    marginTop: '0.5rem', padding: '0.8rem',
    background: '#1a1a1a', color: '#fafaf8',
    border: 'none', borderRadius: '8px',
    fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer',
  },
  footer: { textAlign: 'center', fontSize: '0.875rem', color: '#888', marginTop: '1.5rem' },
  footerLink: { color: '#1a1a1a', fontWeight: '600' },
};

export default Register;
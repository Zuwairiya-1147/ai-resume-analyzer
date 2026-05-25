import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav style={s.nav}>
      <Link to="/" style={s.logo}>ResumeAI</Link>
      <div style={s.links}>
        {user ? (
          <>
            <span style={s.welcome}>Hi, {user.name}</span>
            <Link to="/dashboard" style={s.link}>Dashboard</Link>
            <Link to="/analyze" style={s.btn}>Analyze resume</Link>
            <button onClick={handleLogout} style={s.ghost}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={s.link}>Login</Link>
            <Link to="/register" style={s.btn}>Get started</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const s = {
  nav: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    padding: '1rem 2rem', borderBottom: '1px solid #e8e6e1',
    background: '#fafaf8', position: 'sticky', top: 0, zIndex: 100,
  },
  logo: {
    fontFamily: "'Instrument Serif', serif", fontSize: '1.3rem',
    color: '#1a1a1a', letterSpacing: '-0.01em',
  },
  links: { display: 'flex', alignItems: 'center', gap: '1.2rem' },
  link: { fontSize: '0.875rem', color: '#666' },
  btn: {
    fontSize: '0.875rem', background: '#1a1a1a', color: '#fafaf8',
    padding: '0.45rem 1.1rem', borderRadius: '6px', fontWeight: '500',
  },
  ghost: {
    fontSize: '0.875rem', background: 'transparent', color: '#666',
    border: '1px solid #e0ddd8', padding: '0.4rem 1rem', borderRadius: '6px',
  },
  welcome: { fontSize: '0.875rem', color: '#999' },
};

export default Navbar;
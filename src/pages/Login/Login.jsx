import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import api from '../../services/api';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm]         = useState({ username: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState('');

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError('Please enter your username and password.');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/auth/login.php', form);
      const token = res?.data?.token;
      const user  = res?.data?.user;
      if (!token) {
        setError('Login failed. Please try again.');
        return;
      }
      localStorage.setItem('vems_token', token);
      localStorage.setItem('vems_user', JSON.stringify(user));
      navigate('/dashboard');
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        err?.message ||
        'Invalid credentials. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__left">
        <div className="login-page__left-content">

          <div className="login-page__logo">
            <div className="login-page__logo-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.2"
                strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
            </div>
            <div>
              <h1 className="login-page__logo-title">VEMS</h1>
              <p className="login-page__logo-sub">Ethiopia</p>
            </div>
          </div>

          <div className="login-page__hero">
            <h2 className="login-page__hero-title">
              Vital Events<br />Management System
            </h2>
            <p className="login-page__hero-desc">
              A centralized digital platform for registering and managing
              birth, death, marriage, and divorce records across Ethiopia.
            </p>
          </div>

          <div className="login-page__features">
            {[
              { icon: '👶', label: 'Birth Registration' },
              { icon: '💍', label: 'Marriage Records' },
              { icon: '📋', label: 'Death Registration' },
              { icon: '⚖️', label: 'Divorce Records' },
            ].map((f) => (
              <div key={f.label} className="login-page__feature-item">
                <span className="login-page__feature-icon">{f.icon}</span>
                <span>{f.label}</span>
              </div>
            ))}
          </div>

          <p className="login-page__credit">
            Wollo University — Kombolcha Institute of Technology
          </p>
        </div>
      </div>

      <div className="login-page__right">
        <div className="login-card">
          <div className="login-card__top">
            <div className="login-card__avatar">
              <FiUser size={26} />
            </div>
            <h2 className="login-card__title">Welcome back</h2>
            <p className="login-card__subtitle">Sign in to your VEMS account</p>
          </div>

          {error && (
            <div className="login-card__error" role="alert">
              <span>⚠</span> {error}
            </div>
          )}

          <form className="login-card__form" onSubmit={handleSubmit} noValidate>
            <div className="login-card__field">
              <label className="login-card__label" htmlFor="username">Username</label>
              <div className="login-card__input-wrap">
                <FiUser size={16} className="login-card__input-icon" />
                <input
                  id="username" name="username" type="text"
                  autoComplete="username" value={form.username}
                  onChange={handleChange} placeholder="Enter your username"
                  className="login-card__input" autoFocus
                />
              </div>
            </div>

            <div className="login-card__field">
              <label className="login-card__label" htmlFor="password">Password</label>
              <div className="login-card__input-wrap">
                <FiLock size={16} className="login-card__input-icon" />
                <input
                  id="password" name="password"
                  type={showPass ? 'text' : 'password'}
                  autoComplete="current-password" value={form.password}
                  onChange={handleChange} placeholder="Enter your password"
                  className="login-card__input"
                />
                <button type="button" className="login-card__eye"
                  onClick={() => setShowPass((v) => !v)}
                  aria-label={showPass ? 'Hide password' : 'Show password'}>
                  {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="login-card__btn" disabled={loading}>
              {loading ? (
                <span className="login-card__spinner" />
              ) : (
                <><span>Sign In</span><FiArrowRight size={17} /></>
              )}
            </button>
          </form>

          <div className="login-card__hint">
            <p>Default credentials:</p>
            <code>admin / admin123</code>
          </div>

          <p className="login-card__footer">
            VEMS &copy; {new Date().getFullYear()} — Vital Events Management System
          </p>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";

function Login() {
  const [activeTab, setActiveTab] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);

  const [signinData, setSigninData] = useState({
    username: '',
    password: '',
  });

  const [registerData, setRegisterData] = useState({
    firstName: '',
    fatherName: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const onlyLetters = (value) => /^[A-Za-z\s]*$/.test(value);
  const onlyNumbers = (value) => /^[0-9]*$/.test(value);

  const handleSigninChange = (e) => {
    const { name, value } = e.target;

    if (name === "username") {
      if (!onlyLetters(value)) return;
    }

    setSigninData({
      ...signinData,
      [name]: value,
    });

    e.target.style.border = "";
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;

    if (name === "firstName" || name === "fatherName") {
      if (!onlyLetters(value)) return;
    }

    if (name === "password") {
      if (!onlyNumbers(value)) return;
    }

    setRegisterData({
      ...registerData,
      [name]: value,
    });

    e.target.style.border = "";
  };

  const handleSignin = () => {
    let valid = true;

    const usernameInput = document.querySelector('input[name="username"]');
    const passwordInput = document.querySelector('.form-body--visible input[name="password"]');

    if (signinData.username.trim() === '') {
      usernameInput.style.border = "2px solid red";
      valid = false;
    } else {
      usernameInput.style.border = "";
    }

    if (signinData.password.trim() === '') {
      passwordInput.style.border = "2px solid red";
      valid = false;
    } else {
      passwordInput.style.border = "";
    }

    if (valid) {
      navigate('/dashboard');
    }
  };

  const handleRegister = () => {
    let valid = true;

    const firstNameInput = document.querySelector('input[name="firstName"]');
    const fatherNameInput = document.querySelector('input[name="fatherName"]');
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('.form-body--visible input[name="password"]');

    if (registerData.firstName.trim() === '') {
      firstNameInput.style.border = "2px solid red";
      valid = false;
    } else {
      firstNameInput.style.border = "";
    }

    if (registerData.fatherName.trim() === '') {
      fatherNameInput.style.border = "2px solid red";
      valid = false;
    } else {
      fatherNameInput.style.border = "";
    }

    if (registerData.email.trim() === '') {
      emailInput.style.border = "2px solid red";
      valid = false;
    } else {
      emailInput.style.border = "";
    }

    if (registerData.password.trim() === '') {
      passwordInput.style.border = "2px solid red";
      valid = false;
    } else {
      passwordInput.style.border = "";
    }

    if (valid) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-root">
      <div className="bg-grid" />
      <div className="bg-glow" />

      <div className="login-card">
        <div className="brand-panel">
          <div className="brand-content">
            <div className="brand-badge">VEMS. 2026</div>

            <h1 className="brand-title">
              VEMS<span className="brand-dot">.</span>
            </h1>

            <p className="brand-sub">
              Vital Management System for efficient record-keeping and streamlined operations in civil registration offices.
            </p>

            <div className="brand-lines">
              <span />
              <span />
              <span />
            </div>
          </div>

          <div className="brand-orb" />
          <div className="brand-orb brand-orb--2" />
        </div>

        <div className="form-panel">
          <div className="tab-switcher">
            <button
              className={`tab-btn ${activeTab === 'signin' ? 'tab-btn--active' : ''}`}
              onClick={() => setActiveTab('signin')}
            >
              Sign In
            </button>

            <button
              className={`tab-btn ${activeTab === 'register' ? 'tab-btn--active' : ''}`}
              onClick={() => setActiveTab('register')}
            >
              Register
            </button>

            <div
              className={`tab-indicator ${activeTab === 'register' ? 'tab-indicator--right' : ''}`}
            />
          </div>

          {/* SIGN IN */}
          <div className={`form-body ${activeTab === 'signin' ? 'form-body--visible' : 'form-body--hidden'}`}>
            <div className="form-header">
              <h2>Welcome back</h2>
              <p>Sign in to continue your session</p>
            </div>

            <div className="field-group">
              <label className="field-label">Username</label>

              <div className="field-wrap">
                <span className="field-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                </span>

                <input
                  type="text"
                  name="username"
                  value={signinData.username}
                  onChange={handleSigninChange}
                  placeholder="your_username"
                  className="field-input"
                />
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Password</label>

              <div className="field-wrap">
                <span className="field-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="5" y="11" width="14" height="10" rx="2" />
                    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                  </svg>
                </span>

                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={signinData.password}
                  onChange={handleSigninChange}
                  placeholder="Password"
                  className="field-input"
                />

                <button
                  type="button"
                  className="field-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="form-meta">
              <label className="remember-label">
                <input type="checkbox" className="remember-check" />
                <span className="remember-custom" />
                Remember me
              </label>

              <a href="#" className="forgot-link">
                Forgot password?
              </a>
            </div>

            <button
              className="submit-btn"
              onClick={handleSignin}
            >
              <span>Sign In</span>

              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>

            <div className="divider">
              <span>or continue with</span>
            </div>

            <div className="oauth-row">
              <button className="oauth-btn">
                Google
              </button>

              <button className="oauth-btn">
                GitHub
              </button>
            </div>
          </div>

          {/* REGISTER */}
          <div className={`form-body ${activeTab === 'register' ? 'form-body--visible' : 'form-body--hidden'}`}>
            <div className="form-header">
              <h2>Create account</h2>
              <p>Join and get full access instantly</p>
            </div>

            <div className="field-row">
              <div className="field-group">
                <label className="field-label">First Name</label>

                <div className="field-wrap">
                  <input
                    type="text"
                    name="firstName"
                    value={registerData.firstName}
                    onChange={handleRegisterChange}
                    placeholder="ABDUL"
                    className="field-input field-input--bare"
                  />
                </div>
              </div>

              <div className="field-group">
                <label className="field-label">Father Name</label>

                <div className="field-wrap">
                  <input
                    type="text"
                    name="fatherName"
                    value={registerData.fatherName}
                    onChange={handleRegisterChange}
                    placeholder="KADIR"
                    className="field-input field-input--bare"
                  />
                </div>
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Email</label>

              <div className="field-wrap">
                <input
                  type="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  placeholder="john@example.com"
                  className="field-input"
                />
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Password</label>

              <div className="field-wrap">
                <input
                  type="password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  placeholder="Only Numbers"
                  className="field-input"
                />
              </div>
            </div>

            <button
              className="submit-btn"
              onClick={handleRegister}
            >
              <span>Create Account</span>

              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>

            <p className="terms-note">
              By registering, you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
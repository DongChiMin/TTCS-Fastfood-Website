import React, { useState } from 'react';
import logo from '../assets/images/logo-black.png';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Forms from '../components/Forms/Reservation'
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Login successful!');
    }, 1500);
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center py-5 bg-light">
        <Forms/>
      <div
        className="card shadow p-5"
        style={{
          maxWidth: '800px', // Bigger form
          width: '100%',
          borderRadius: '1rem',
          fontSize: '1.2rem', // Bigger text
          backgroundColor: '#fff' // White background card
        }}
      >
        <div className="text-center mb-4">
          <img
            src={logo}
            alt="logo"
            className="rounded-circle"
            style={{ width: '270px', height: '100px', objectFit: 'cover' }}
          />
        </div>

        <h2 className="text-center mb-4 text-uppercase fw-semibold" style={{ letterSpacing: '2px' }}>
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="username"
              placeholder="yourusername"
              required
            />
          </div>

          <div className="mb-4 position-relative">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control form-control-lg"
              id="password"
              placeholder="Password"
              required
            />
            <i
              className={`fa ${showPassword ? 'fa-eye-slash' : 'fa-eye'} position-absolute`}
              style={{ top: '50px', right: '15px', cursor: 'pointer', color: '#888' }}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" defaultChecked id="remember" />
              <label className="form-check-label" htmlFor="remember">Remember me</label>
            </div>
            <a href="/" className="text-decoration-none text-danger">Forgot password?</a>
          </div>

          <button type="submit" className="btn btn-danger btn-lg w-100 fw-semibold" disabled={loading}>
            {loading ? (
              <span>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Processing...
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>

        <p className="text-center mt-4">
          Don't have an account?{' '}
          <a href="/" className="text-decoration-none text-primary fw-semibold">Sign up now</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

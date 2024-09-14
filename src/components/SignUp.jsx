import React, { useState } from 'react';
import '../../Custom.css'; 

export const SignUp = ({
  GoogleAuth, 
  placeholders, 
  buttonText, 
  className, 
  onSubmit,
  containerStyle, 
  headerStyle,
  inputStyle,
  buttonStyle,
  footerStyle,
  errorStyle,
  signInLink,
  theme = 'light' // Default theme is light
}) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await onSubmit(formData);

      if (!result.success) {
        setError(result.message || 'Sign up failed!');
        setLoading(false);
        return;
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Something went wrong! Please try again later.');
    }
  };

  return (
    <div className={`signup-container ${className}`} style={containerStyle} data-theme={theme}>
      <h1 className="signup-header" style={headerStyle}>Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          placeholder={placeholders?.username || "Username"}
          id="username"
          className="signup-input"
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="email"
          placeholder={placeholders?.email || "Email"}
          id="email"
          className="signup-input"
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder={placeholders?.password || "Password"}
          id="password"
          className="signup-input"
          onChange={handleChange}
          style={inputStyle}
        />
        <button
          disabled={loading}
          className="signup-button"
          style={buttonStyle}
        >
          {loading ? "Loading..." : (buttonText || "Sign Up")}
        </button>

        {GoogleAuth && <GoogleAuth />}
      </form>
      <div className="signup-footer" style={footerStyle}>
        <p className="signup-footer-text">
          Have an account? 
          <a 
            href={signInLink || "/sign-in"} 
            className="signup-signin-link"
          >
            Sign In
          </a>
        </p>
      </div>
      {error && <p className="signup-error" style={errorStyle}>{error}</p>}
    </div>
  );
};

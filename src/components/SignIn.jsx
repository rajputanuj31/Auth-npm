import React, { useState } from "react";
import '../../Custom.css'; 

export const SignIn = ({
  GoogleAuth, 
  placeholders = { email: "Enter Email", password: "Enter Password" },
  buttonText = "Sign In",
  className = "",
  onSubmit,  
  containerStyle,
  headerStyle,
  inputStyle,
  buttonStyle,
  footerStyle,
  errorStyle,
  signUpLink,
  theme = 'light' 
}) => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [signInSuccess, setSignInSuccess] = useState(false);

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
        setError(result.message || 'Sign in failed!');
        setLoading(false);
        return;
      }

      // If successful, indicate success
      setSignInSuccess(true);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError('Something went wrong! Please try again later.');
    }
  };

  return (
    <div className={`signin-container ${className}`} style={containerStyle} data-theme={theme}>
      <h1 className="signin-header" style={headerStyle}>Sign In</h1>
      <form onSubmit={handleSubmit} className="signin-form">
        <input
          type="email"
          placeholder={placeholders.email}
          id="email"
          className="signin-input"
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder={placeholders.password}
          id="password"
          className="signin-input"
          onChange={handleChange}
          style={inputStyle}
        />
        <button
          disabled={loading}
          className="signin-button"
          style={buttonStyle}
        >
          {loading ? "Loading..." : buttonText}
        </button>

        {GoogleAuth && <GoogleAuth />}
      </form>
      
      <div className="signin-footer" style={footerStyle}>
        <p className="signin-footer-text">
          Don't Have an account? 
          <a href={signUpLink || '/sign-up'} className="signup-signin-link">Sign Up</a>
        </p>
      </div>

      {error && <p className="signin-error" style={errorStyle}>{error}</p>}
      {signInSuccess && <p className="signin-success">Sign In Successful</p>}
    </div>
  );
};

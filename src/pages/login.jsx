import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLeaf, FaUser, FaLock, FaEnvelope, FaArrowLeft } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    travelerType: 'eco-conscious'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // Handle login
      if (formData.email && formData.password) {
        // Simulate successful login
        localStorage.setItem('user', JSON.stringify({
          name: formData.email.split('@')[0],
          email: formData.email
        }));
        navigate('/dashboard');
      }
    } else {
      // Handle signup
      if (formData.name && formData.email && formData.password) {
        // Simulate successful signup
        localStorage.setItem('user', JSON.stringify({
          name: formData.name,
          email: formData.email,
          travelerType: formData.travelerType
        }));
        navigate('/dashboard');
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="auth-header">
          <FaLeaf className="auth-logo" />
          <h1>{isLogin ? 'Welcome Back!' : 'Join EcoTrail Tracker'}</h1>
          <p>{isLogin ? 'Sign in to your EcoTrail Tracker account' : 'Create your free account and start your sustainable journey'}</p>
        </div>
        
        <div className="auth-body">
          <form className="auth-form" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">
                  <FaUser /> Full Name
                </label>
                <input 
                  type="text" 
                  id="name"
                  placeholder="Your name"
                  required={!isLogin}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email">
                <FaEnvelope /> Email Address
              </label>
              <input 
                type="email" 
                id="email"
                placeholder="you@example.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">
                <FaLock /> Password
              </label>
              <input 
                type="password" 
                id="password"
                placeholder={isLogin ? "Enter your password" : "At least 8 characters"}
                required
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="travelerType">Traveler Type</label>
                <select 
                  id="travelerType"
                  value={formData.travelerType}
                  onChange={(e) => setFormData({...formData, travelerType: e.target.value})}
                >
                  <option value="eco-conscious">Eco-Conscious Traveler</option>
                  <option value="backpacker">Backpacker/Student</option>
                  <option value="family">Family Traveler</option>
                  <option value="adventure">Adventure Seeker</option>
                  <option value="local">Local Explorer</option>
                </select>
              </div>
            )}
            
            <button type="submit" className="btn full-width">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>
          
          <div className="auth-footer">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                type="button" 
                className="link-btn"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? ' Sign up here' : ' Log in here'}
              </button>
            </p>
            <p>
              <button 
                type="button" 
                className="link-btn"
                onClick={() => navigate('/')}
              >
                <FaArrowLeft /> Back to Home
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
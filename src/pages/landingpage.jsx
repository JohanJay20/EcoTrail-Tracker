import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaLeaf, FaMapMarkedAlt, FaTrophy, FaHandsHelping, 
  FaBars, FaTimes, FaFacebookF, FaInstagram, FaTwitter, FaYoutube,
  FaMapMarkerAlt, FaEnvelope, FaPhone, FaClock
} from 'react-icons/fa';

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const FeatureCard = ({ icon, title, description }) => (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );

  const Step = ({ number, title, description }) => (
    <div className="step">
      <div className="step-number">{number}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );

  const TestimonialCard = ({ text, avatar, name, role }) => (
    <div className="testimonial-card">
      <p>"{text}"</p>
      <div className="testimonial-author">
        <div className="author-avatar">{avatar}</div>
        <div>
          <h4>{name}</h4>
          <p>{role}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="landing-page">
      {/* Header */}
      <header>
        <div className="container">
          <nav>
            <Link to="/" className="logo">
              <FaLeaf /> EcoTrail Tracker
            </Link>
            <div className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
              <li><a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
              <li><a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a></li>
              <li><a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How It Works</a></li>
              <li><Link to="/login" onClick={() => setMobileMenuOpen(false)}>Log In</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="container">
          <h1>Travel Responsibly, Track Your Impact</h1>
          <p>Explore Impasug-ong's eco-friendly destinations, support local green businesses, and measure your contribution to sustainability with EcoTrail Tracker.</p>
          <div className="hero-btns">
            <Link to="/login" className="btn">Start Your Eco Journey</Link>
            <a href="#how-it-works" className="btn btn-outline">Learn How It Works</a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features">
        <div className="container">
          <h2 className="section-title">Why Choose EcoTrail Tracker?</h2>
          <p className="section-subtitle">Our platform connects eco-conscious travelers with sustainable experiences while promoting environmental education and local livelihoods.</p>
          
          <div className="features-grid">
            <FeatureCard 
              icon={<FaMapMarkedAlt />}
              title="Interactive Eco-Map"
              description="Discover verified sustainable destinations, accommodations, and experiences across Impasug-ong with our interactive map."
            />
            <FeatureCard 
              icon={<FaTrophy />}
              title="Earn Eco-Points"
              description="Get rewarded for sustainable travel choices. Earn points for staying at eco-lodges, supporting local businesses, and more."
            />
            <FeatureCard 
              icon={<FaHandsHelping />}
              title="Support Local Communities"
              description="Your travel directly supports indigenous communities and local eco-businesses committed to sustainability."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" style={{ backgroundColor: '#f1f8e9' }}>
        <div className="container">
          <h2 className="section-title">How EcoTrail Tracker Works</h2>
          <p className="section-subtitle">Join thousands of eco-conscious travelers making a positive impact in Impasug-ong, Bukidnon.</p>
          
          <div className="steps-container">
            <Step number="1" title="Create Your Account" description="Sign up for free and set up your eco-traveler profile. It takes less than 2 minutes." />
            <Step number="2" title="Explore & Plan" description="Use our eco-map to discover sustainable accommodations, restaurants, and activities in Impasug-ong." />
            <Step number="3" title="Track & Earn" description="Scan QR codes at verified locations, log sustainable actions, and earn eco-points for rewards." />
            <Step number="4" title="Make an Impact" description="See your positive contribution to local communities and environmental conservation efforts." />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials">
        <div className="container">
          <h2 className="section-title">What Travelers Say</h2>
          <p className="section-subtitle">Join our community of eco-conscious travelers making a difference in Impasug-ong.</p>
          
          <div className="testimonials-container">
            <TestimonialCard 
              text="EcoTrail Tracker transformed how I travel. I discovered amazing local eco-businesses I would have never found otherwise!"
              avatar="MJ"
              name="Maria Johnson"
              role="Adventure Traveler"
            />
            <TestimonialCard 
              text="As a student on a budget, I appreciate how EcoTrail Tracker helps me make sustainable choices without breaking the bank."
              avatar="CR"
              name="Carlos Reyes"
              role="Student Backpacker"
            />
            <TestimonialCard 
              text="Our family vacation was more meaningful thanks to EcoTrail Tracker. The kids loved earning points for sustainable choices!"
              avatar="SP"
              name="Sarah & Peter"
              role="Family Travelers"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2>Ready to Travel Responsibly?</h2>
          <p>Join EcoTrail Tracker today and start your journey towards sustainable tourism. Track your impact, discover green businesses, and contribute to conservation efforts in Impasug-ong.</p>
          <Link to="/login" className="btn cta-btn">Sign Up Free</Link>
          <p className="cta-note">No credit card required • Free forever plan</p>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-about">
              <div className="footer-logo">
                <FaLeaf /> EcoTrail Tracker
              </div>
              <p>"Travel Responsibly, Track Your Impact." Our platform supports environmental education, local livelihoods, and continuous eco-awareness.</p>
              <div className="social-icons">
                <a href="#"><FaFacebookF /></a>
                <a href="#"><FaInstagram /></a>
                <a href="#"><FaTwitter /></a>
                <a href="#"><FaYoutube /></a>
              </div>
            </div>
            
            <div className="footer-links">
              <h3>Quick Links</h3>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><a href="#features">Features</a></li>
                <li><a href="#how-it-works">How It Works</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
              </ul>
            </div>
            
            <div className="footer-contact">
              <h3>Contact Us</h3>
              <p><FaMapMarkerAlt /> Impasug-ong, Bukidnon, Philippines</p>
              <p><FaEnvelope /> info@ecotrailtracker.ph</p>
              <p><FaPhone /> +63 912 345 6789</p>
              <p><FaClock /> Mon - Fri: 9:00 AM - 5:00 PM</p>
            </div>
          </div>
          
          <div className="copyright">
            <p>&copy; 2023 EcoTrail Tracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
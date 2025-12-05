import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaLeaf, FaTrophy, FaHistory, FaMapMarkedAlt, FaFlagCheckered,
  FaStore, FaBolt, FaQrcode, FaPlus, FaNewspaper, FaShareAlt,
  FaUtensils, FaBed, FaHiking, FaMap, FaSignOutAlt, FaStar, FaMapMarkerAlt
} from 'react-icons/fa';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [newActivity, setNewActivity] = useState({
    type: 'accommodation',
    description: ''
  });

  // Check if user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleAddActivity = () => {
    if (newActivity.description.trim()) {
      const pointsMap = {
        accommodation: 50,
        dining: 25,
        transport: 15,
        shopping: 30,
        activity: 40,
        conservation: 100
      };
      
      // In a real app, you would save this to backend
      setShowActivityModal(false);
      setNewActivity({ type: 'accommodation', description: '' });
      alert(`Activity logged: ${newActivity.description}`);
    }
  };

  // Green businesses data
  const greenBusinesses = [
    {
      id: 1,
      name: 'Kaamulan Native Cafe',
      type: 'Restaurant',
      distance: '0.5 miles away',
      rating: 4.8,
      icon: <FaUtensils />,
      description: 'Traditional Bukidnon cuisine with locally sourced ingredients',
      ecoRating: '★★★★★',
      tags: ['Local Food', 'Eco-Friendly', 'Vegetarian Options']
    },
    {
      id: 2,
      name: 'Mount Kitanglad Eco-Lodge',
      type: 'Accommodation',
      distance: '2.1 miles away',
      rating: 4.9,
      icon: <FaBed />,
      description: 'Sustainable mountain lodge with solar power and rainwater harvesting',
      ecoRating: '★★★★★',
      tags: ['Solar Powered', 'Rainwater Harvesting', 'Zero Waste']
    },
    {
      id: 3,
      name: 'Eco-Adventure Tours',
      type: 'Tour Operator',
      distance: '1.3 miles away',
      rating: 4.7,
      icon: <FaHiking />,
      description: 'Guided nature tours supporting local conservation efforts',
      ecoRating: '★★★★☆',
      tags: ['Guided Tours', 'Conservation', 'Local Guides']
    }
  ];

  if (!user) {
    return <div>Loading...</div>;
  }

  const activities = [
    { description: 'Stayed at Mount Kitanglad Eco-Lodge', points: 50, date: 'Today' },
    { description: 'Used reusable water bottle', points: 10, date: 'Today' },
    { description: 'Tried local dish at Kaamulan Cafe', points: 25, date: 'Yesterday' },
    { description: 'Joined trail cleanup', points: 100, date: '2 days ago' }
  ];

  const totalPoints = activities.reduce((sum, activity) => sum + activity.points, 0);

  return (
    <div className="dashboard-page">
      {/* Dashboard Header */}
      <header className="dashboard-header">
        <div className="container">
          <nav className="dashboard-nav">
            <Link to="/" className="logo">
              <FaLeaf /> EcoTrail Tracker
            </Link>
            <div className="user-menu">
              <div className="user-info">
                <p className="username">{user.name}</p>
                <p className="user-level">Eco Explorer Level</p>
              </div>
              <button className="btn btn-outline" onClick={handleLogout}>
                <FaSignOutAlt /> Log Out
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Dashboard Main Content */}
      <section className="dashboard-main">
        <div className="container">
          {/* Welcome Section */}
          <div className="dashboard-welcome">
            <h1>Welcome back, {user.name}!</h1>
            <p>Keep up the great work! You've earned <strong>{totalPoints.toLocaleString()}</strong> eco-points this month.</p>
          </div>

          {/* Dashboard Grid */}
          <div className="dashboard-grid">
            {/* Points Card */}
            <div className="dashboard-card">
              <h3><FaTrophy /> Your Eco-Points</h3>
              <div className="points-display">
                <p>Total Points</p>
                <div className="points-value">{totalPoints.toLocaleString()}</div>
                <p>255 points to next level</p>
              </div>
              <div className="text-center">
                <button className="btn" onClick={() => setShowActivityModal(true)}>
                  <FaPlus /> Log New Activity
                </button>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="dashboard-card">
              <h3><FaHistory /> Recent Activities</h3>
              <ul className="recent-activities">
                {activities.map((activity, index) => (
                  <li key={index}>
                    <div>
                      <p className="activity-title">{activity.description}</p>
                      <p className="activity-date">{activity.date}</p>
                    </div>
                    <span className="activity-points">+{activity.points}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Green Businesses Card */}
            <div className="dashboard-card">
              <div className="card-header">
                <FaStore className="card-icon" />
                <h3>Nearby Green Businesses</h3>
                <span className="business-count">{greenBusinesses.length} nearby</span>
              </div>
              
              <div className="businesses-list">
                {greenBusinesses.map((business) => (
                  <div key={business.id} className="business-item">
                    {/* Business Icon */}
                    <div className="business-icon">
                      {business.icon}
                    </div>
                    
                    {/* Business Details */}
                    <div className="business-details">
                      <div className="business-header">
                        <h4 className="business-name">{business.name}</h4>
                        <div className="business-rating">
                          <FaStar className="star-icon" />
                          <span className="rating-value">{business.rating}</span>
                          <span className="eco-badge">{business.ecoRating}</span>
                        </div>
                      </div>
                      
                     
                      
                      <div className="business-footer">
                        <div className="distance">
                          <FaMapMarkerAlt className="location-icon" />
                          <span>{business.distance}</span>
                        </div>
                        <button className="view-btn">View Details</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="btn btn-outline full-width">
                View All Businesses
              </button>
            </div>

            {/* Eco Map Preview */}
            <div className="dashboard-card">
              <h3><FaMapMarkedAlt /> Eco-Map</h3>
              <p>Explore sustainable destinations in Malaybalay</p>
              <div className="map-preview">
                <FaMap />
                <p>Interactive map of eco-friendly locations</p>
              </div>
              <button className="btn full-width"
               onClick={() => navigate('/ecoMap')}>View Full Map</button>
              
            </div>

            {/* Current Challenges */}
            <div className="dashboard-card">
              <h3><FaFlagCheckered /> Current Challenges</h3>
              <div className="challenge-progress">
                <div className="challenge-header">
                  <span>Zero Waste Week</span>
                  <span>4/7 days</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '57%' }}></div>
                </div>
              </div>
              
              <div className="challenge-progress">
                <div className="challenge-header">
                  <span>Local Food Explorer</span>
                  <span>4/5 dishes</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: '80%' }}></div>
                </div>
              </div>
              
              <button className="btn btn-outline full-width">View All Challenges</button>
            </div>

            {/* Quick Actions */}
            <div className="dashboard-card">
              <h3><FaBolt /> Quick Actions</h3>
              <div className="quick-actions-grid">
                <button className="btn btn-outline">
                  <FaQrcode /> Scan QR
                </button>
                <button className="btn btn-outline" onClick={() => setShowActivityModal(true)}>
                  <FaPlus /> Log Activity
                </button>
                <button className="btn btn-outline">
                  <FaNewspaper /> Read Stories
                </button>
                <button className="btn btn-outline">
                  <FaShareAlt /> Share Impact
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="copyright">
            <p>&copy; 2023 EcoTrail Tracker. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Activity Modal */}
      {showActivityModal && (
        <div className="modal-overlay" onClick={() => setShowActivityModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Log New Eco Activity</h3>
            <div className="form-group">
              <label>Activity Type</label>
              <select 
                value={newActivity.type}
                onChange={(e) => setNewActivity({...newActivity, type: e.target.value})}
              >
                <option value="accommodation">Eco Accommodation Stay</option>
                <option value="dining">Sustainable Dining</option>
                <option value="transport">Green Transportation</option>
                <option value="shopping">Local/Eco Shopping</option>
                <option value="activity">Eco Activity/Tour</option>
                <option value="conservation">Conservation Activity</option>
              </select>
            </div>
            <div className="form-group">
              <label>Description</label>
              <input 
                type="text" 
                placeholder="E.g., Stayed at Mount Kitanglad Eco-Lodge"
                value={newActivity.description}
                onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
              />
            </div>
            <div className="modal-actions">
              <button className="btn" onClick={handleAddActivity}>Save Activity</button>
              <button className="btn btn-outline" onClick={() => setShowActivityModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
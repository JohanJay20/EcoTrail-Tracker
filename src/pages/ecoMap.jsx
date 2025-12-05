import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FaLeaf, FaTrophy, FaHistory, FaMapMarkedAlt, FaFlagCheckered,
  FaStore, FaBolt, FaQrcode, FaPlus, FaNewspaper, FaShareAlt,
  FaUtensils, FaBed, FaHiking, FaMap, FaSignOutAlt, FaTree, 
  FaCoffee, FaShoppingBag, FaCar, FaMountain, FaSwimmingPool,
  FaCampground, FaWater
} from 'react-icons/fa';
import { FaBridge,FaCow } from "react-icons/fa6";

// React Leaflet imports
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet default icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const EcoMap = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

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

  // Center on Impasug-ong, Bukidnon
  const mapCenter = [8.3056, 125.0139];
  const mapZoom = 12;

  // Eco-friendly locations in Impasug-ong
  const ecoLocations = [
     {
    id: 1,
    name: "Rotypeaks Ridge Camp",
    type: "camping",
    position: [8.3424038, 125.037228],
    description: "Scenic camping site overlooking the mountains with eco-friendly amenities",
    rating: 4.7,
    icon: FaCampground,
    color: "#2E8B57"
  },
  {
    id: 2,
    name: "Cedar Communal",
    type: "recreation",
    position: [8.2497721, 125.0316295],
    description: "Natural Swimming Pool with Sustainable Water Management & Waterfall Feature",
    rating: 4.5,
    icon: FaSwimmingPool,
    color: "#1E90FF"
  },
  {
    id: 3,
    name: "Mount Kitanglad Range",
    type: "mountain",
    position: [8.1184714, 124.8122055],
    description: "Protected natural park with hiking trails and biodiversity conservation",
    rating: 4.9,
    icon: FaMountain,
    color: "#1E5631"
  },
  {
    id: 4,
    name: "Panika Eco-Site",
    type: "activity",
    position: [8.2480823, 125.1725303],
    description: "Nature reserve with guided eco-tours and cultural immersion programs",
    rating: 4.6,
    icon: FaHiking,
    color: "#3CB371"
  },
  {
    id: 5,
    name: "Municipal Tree Park",
    type: "park",
    position: [8.31081, 124.9853],
    description: "Community tree park with native species conservation and educational tours",
    rating: 4.4,
    icon: FaTree,
    color: "#4CAF50"
  },
  {
    id: 6,
    name: "Atugan Swimming Pool",
    type: "recreation",
    position: [8.2980559, 125.0128588],
    description: "Natural swimming pool with sustainable water management system",
    rating: 4.3,
    icon: FaSwimmingPool,
    color: "#1E90FF"
  },
  {
    id: 7,
    name: "Cowboy Town",
    type: "cultural",
    position: [8.2920045, 124.9853276],
    description: "Cultural heritage site showcasing local cowboy traditions and crafts",
    rating: 4.5,
    icon: FaCow,
    color: "#8B4513"
  },
  {
    id: 8,
    name: "Atugan Bridge",
    type: "landmark",
    position: [8.2695499,124.9999953],
    description: "Historical bridge with scenic river views and local artisan market",
    rating: 4.2,
    icon: FaBridge,
    color: "#4682B4"
  },

  ];

  // Filter locations based on selected type
  const filteredLocations = activeFilter === 'all' 
    ? ecoLocations 
    : ecoLocations.filter(loc => loc.type === activeFilter);

  // Create custom icons
  const createCustomIcon = (color) => {
    return new L.Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
          <circle cx="16" cy="16" r="14" fill="${color}" stroke="white" stroke-width="2"/>
          <circle cx="16" cy="16" r="6" fill="white"/>
        </svg>
      `)}`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
  };

  if (!user) {
    return <div>Loading...</div>;
  }

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
            <h1>Welcome to Impasug-ong Eco-Map, {user.name}!</h1>
            <p>Discover sustainable destinations across Impasug-ong, Bukidnon</p>
          </div>

          {/* Map Filters */}
          <div className="dashboard-card" style={{ marginBottom: '20px' }}>
            <h3><FaMapMarkedAlt /> Filter Locations</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '15px' }}>
              <button 
                className={`btn ${activeFilter === 'all' ? '' : 'btn-outline'}`}
                onClick={() => setActiveFilter('all')}
                style={{ fontSize: '0.9rem' }}
              >
                All Locations
              </button>
              <button 
                className={`btn ${activeFilter === 'camping' ? '' : 'btn-outline'}`}
                onClick={() => setActiveFilter('camping')}
                style={{ fontSize: '0.9rem' }}
              >
                <FaCampground /> Camping Sites
              </button>
              <button 
                className={`btn ${activeFilter === 'mountain' ? '' : 'btn-outline'}`}
                onClick={() => setActiveFilter('mountain')}
                style={{ fontSize: '0.9rem' }}
              >
                <FaMountain /> Mountains
              </button>
              <button 
                className={`btn ${activeFilter === 'activity' ? '' : 'btn-outline'}`}
                onClick={() => setActiveFilter('activity')}
                style={{ fontSize: '0.9rem' }}
              >
                <FaHiking /> Eco Activities
              </button>
              <button 
                className={`btn ${activeFilter === 'park' ? '' : 'btn-outline'}`}
                onClick={() => setActiveFilter('park')}
                style={{ fontSize: '0.9rem' }}
              >
                <FaTree /> Parks
              </button>
              <button 
                className={`btn ${activeFilter === 'recreation' ? '' : 'btn-outline'}`}
                onClick={() => setActiveFilter('recreation')}
                style={{ fontSize: '0.9rem' }}
              >
                <FaSwimmingPool /> Recreation
              </button>
              <button 
                className={`btn ${activeFilter === 'cultural' ? '' : 'btn-outline'}`}
                onClick={() => setActiveFilter('cultural')}
                style={{ fontSize: '0.9rem' }}
              >
                <FaCow /> Cultural Sites
              </button>
          
            </div>
          </div>

          {/* Interactive Map */}
          <div className="dashboard-card" style={{ marginTop: '20px', height: '600px', padding: '0' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
              <h3><FaMapMarkedAlt /> Eco-Map of Impasug-ong</h3>
              <p>Explore sustainable destinations in Impasug-ong, Bukidnon</p>
            </div>
            
            <div style={{ height: '500px', width: '100%', position: 'relative' }}>
              <MapContainer 
                center={mapCenter} 
                zoom={mapZoom} 
                style={{ height: '100%', width: '100%', borderRadius: '0 0 10px 10px' }}
                scrollWheelZoom={true}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {filteredLocations.map(location => {
                  const IconComponent = location.icon;
                  return (
                    <Marker 
                      key={location.id} 
                      position={location.position}
                      icon={createCustomIcon(location.color)}
                    >
                      <Popup>
                        <div style={{ minWidth: '200px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <div style={{ 
                              backgroundColor: location.color, 
                              width: '30px', 
                              height: '30px', 
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginRight: '10px'
                            }}>
                              <IconComponent style={{ color: 'white', fontSize: '16px' }} />
                            </div>
                            <div>
                              <h4 style={{ margin: '0', color: '#1E5631' }}>{location.name}</h4>
                              <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                                {[...Array(5)].map((_, i) => (
                                  <span key={i} style={{ color: i < Math.floor(location.rating) ? '#FFD700' : '#ddd' }}>
                                    ★
                                  </span>
                                ))}
                                <span style={{ marginLeft: '5px', fontSize: '0.9rem' }}>{location.rating}</span>
                              </div>
                            </div>
                          </div>
                          <p style={{ margin: '10px 0', fontSize: '0.9rem' }}>{location.description}</p>
                          <div style={{ 
                            display: 'inline-block', 
                            padding: '3px 8px', 
                            backgroundColor: '#e8f5e9', 
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            color: '#2E8B57',
                            fontWeight: '600',
                            marginTop: '5px'
                          }}>
                            {location.type.charAt(0).toUpperCase() + location.type.slice(1)}
                          </div>
                          <button 
                            className="btn" 
                            style={{ 
                              marginTop: '15px', 
                              width: '100%',
                              padding: '8px',
                              fontSize: '0.9rem'
                            }}
                            onClick={() => alert(`Visit ${location.name} to earn eco-points and support local sustainability!`)}
                          >
                            Visit to Earn Points
                          </button>
                        </div>
                      </Popup>
                    </Marker>
                  );
                })}
              </MapContainer>
            </div>
          </div>

          {/* Legend */}
          <div className="dashboard-card" style={{ marginTop: '20px' }}>
            <h3>Map Legend</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginTop: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '20px', height: '20px', backgroundColor: '#2E8B57', borderRadius: '50%', marginRight: '10px' }}></div>
                <span>Camping & Lodging</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '20px', height: '20px', backgroundColor: '#1E5631', borderRadius: '50%', marginRight: '10px' }}></div>
                <span>Mountains & Parks</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '20px', height: '20px', backgroundColor: '#3CB371', borderRadius: '50%', marginRight: '10px' }}></div>
                <span>Eco Activities</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '20px', height: '20px', backgroundColor: '#4CAF50', borderRadius: '50%', marginRight: '10px' }}></div>
                <span>Dining & Cafes</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '20px', height: '20px', backgroundColor: '#1E90FF', borderRadius: '50%', marginRight: '10px' }}></div>
                <span>Water & Recreation</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ width: '20px', height: '20px', backgroundColor: '#8B4513', borderRadius: '50%', marginRight: '10px' }}></div>
                <span>Crafts & Cultural</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="dashboard-grid" style={{ marginTop: '30px' }}>
            <div className="dashboard-card">
              <h3><FaTrophy /> Impasug-ong Stats</h3>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#2E8B57', margin: '10px 0' }}>
                  {filteredLocations.length}
                </div>
                <p>Eco Locations Found</p>
                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '15px' }}>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1E5631' }}>8</div>
                    <div style={{ fontSize: '0.8rem' }}>Total Sites</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#3CB371' }}>4.6</div>
                    <div style={{ fontSize: '0.8rem' }}>Avg Rating</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="dashboard-card">
              <h3><FaFlagCheckered /> Top Rated Sites</h3>
              <div style={{ marginTop: '15px' }}>
                {ecoLocations
                  .sort((a, b) => b.rating - a.rating)
                  .slice(0, 3)
                  .map(location => (
                    <div key={location.id} style={{ display: 'flex', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                      <div style={{ 
                        backgroundColor: location.color, 
                        width: '30px', 
                        height: '30px', 
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: '10px'
                      }}>
                        {React.createElement(location.icon, { style: { color: 'white', fontSize: '16px' } })}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: '600', margin: 0 }}>{location.name}</p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            {[...Array(5)].map((_, i) => (
                              <span key={i} style={{ 
                                color: i < Math.floor(location.rating) ? '#FFD700' : '#ddd',
                                fontSize: '0.8rem'
                              }}>
                                ★
                              </span>
                            ))}
                          </div>
                          <span style={{ fontSize: '0.8rem', color: '#777' }}>{location.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
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

          {/* About Impasug-ong */}
          <div className="dashboard-card" style={{ marginTop: '30px' }}>
            <h3><FaLeaf /> About Impasug-ong Eco-Tourism</h3>
            <div style={{ marginTop: '15px' }}>
              <p>Impasug-ong, Bukidnon is a premier eco-tourism destination known for its:</p>
              <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
                <li>Rich biodiversity and protected natural areas</li>
                <li>Sustainable agriculture and community-based tourism</li>
                <li>Cultural heritage preservation</li>
                <li>Eco-friendly accommodations and activities</li>
                <li>Commitment to environmental conservation</li>
              </ul>
              <p style={{ marginTop: '15px', fontStyle: 'italic', color: '#666' }}>
                "Support local communities while enjoying nature responsibly"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <div className="copyright">
            <p>&copy; 2023 EcoTrail Tracker. All rights reserved. | Promoting Sustainable Tourism in Impasug-ong</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EcoMap;
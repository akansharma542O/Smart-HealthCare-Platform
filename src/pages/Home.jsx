import '../App.css'

function App() {
  return (
    <div className="app">

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <span>✚</span> MediCare+
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="nav-buttons">
          <button className="login-btn">Login</button>
          <button className="signup-btn">Get Started</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="hero-content">
          <span className="tagline">YOUR HEALTH, OUR PRIORITY</span>

          <h1>
            Healthcare Made <br />
            <span>Simple & Accessible.</span>
          </h1>

          <p>
            Manage appointments, access medical records,
            track medications and take control of your
            healthcare journey — all in one place.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn">Get Started →</button>
            <button className="secondary-btn">Explore Services</button>
          </div>

          <div className="hero-stats">
            <div>
              <h3>24/7</h3>
              <p>Healthcare Access</p>
            </div>
            <div>
              <h3>All-in-One</h3>
              <p>Health Management</p>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="medical-card">
            <div className="medical-icon">✚</div>
            <h2>Your Health Dashboard</h2>
            <p>Everything you need, in one place.</p>

            <div className="dashboard-item">
              <span>📅</span>
              <div>
                <strong>Appointments</strong>
                <small>Manage your visits</small>
              </div>
            </div>

            <div className="dashboard-item">
              <span>💊</span>
              <div>
                <strong>Medicine Tracker</strong>
                <small>Stay on schedule</small>
              </div>
            </div>

            <div className="dashboard-item">
              <span>📋</span>
              <div>
                <strong>Medical Records</strong>
                <small>Your records, organized</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services-section" id="services">
        <span className="tagline">WHAT WE OFFER</span>
        <h2>Healthcare at your fingertips</h2>
        <p className="section-description">
          Everything you need to manage your health journey.
        </p>

        <div className="services-grid">
          <div className="service-card">
            <span>👨‍⚕️</span>
            <h3>Find Doctors</h3>
            <p>Discover doctors and healthcare professionals.</p>
          </div>

          <div className="service-card">
            <span>📅</span>
            <h3>Appointments</h3>
            <p>Book, reschedule and manage appointments.</p>
          </div>

          <div className="service-card">
            <span>📁</span>
            <h3>Medical Records</h3>
            <p>Keep your medical reports organized.</p>
          </div>

          <div className="service-card">
            <span>💊</span>
            <h3>Medicine Tracker</h3>
            <p>Track medicines, dosage and reminders.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact">
        <h3>✚ MediCare+</h3>
        <p>Your health. Your records. Your care.</p>
        <p>© 2026 MediCare+. All rights reserved.</p>
      </footer>

    </div>
  )
}

export default App
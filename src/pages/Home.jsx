import '../App.css'
import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="landing-page">

      {/* Navbar */}
      <nav className="landing-navbar">
        <Link to="/" className="landing-logo">
          <span className="landing-logo-icon">+</span>
          <span>Medi<span>Sync</span></span>
        </Link>

        <div className="landing-nav-links">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#about">About Us</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="landing-nav-buttons">
          <Link to="/login" className="landing-login">Login</Link>
          <Link to="/signup" className="landing-signup">Get Started →</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="landing-hero" id="home">

        <div className="landing-hero-content">
          <div className="landing-badge">
            <span></span> YOUR HEALTH, OUR PRIORITY
          </div>

          <h1>
            Your Health.<br />
            <span>Your Care.</span><br />
            All in One Place.
          </h1>

          <p>
            Take control of your healthcare journey with one simple platform.
            Find doctors, manage appointments, track medicines and keep
            your medical records organized.
          </p>

          <div className="landing-hero-buttons">
            <Link to="/signup" className="landing-primary-btn">
              Get Started <span>→</span>
            </Link>

            <a href="#services" className="landing-secondary-btn">
              Explore Services
            </a>
          </div>

          <div className="landing-trust">
            <div className="trust-icon">✓</div>
            <span>Simple. Secure. Accessible Healthcare.</span>
          </div>
        </div>

        {/* Healthcare Visual */}
        <div className="landing-hero-visual">
          <div className="visual-circle"></div>

          <div className="visual-main-card">
            <div className="visual-card-top">
              <div>
                <small>WELCOME TO</small>
                <h3>MediSync</h3>
              </div>
              <div className="visual-heart">♡</div>
            </div>

            <div className="visual-health-icon">+</div>

            <h2>Care made<br />simpler for you.</h2>
            <p>Your health journey, managed in one place.</p>

            <div className="visual-features">
              <div>
                <span>01</span>
                <strong>Doctor Appointments</strong>
                <b>→</b>
              </div>
              <div>
                <span>02</span>
                <strong>Medical Records</strong>
                <b>→</b>
              </div>
              <div>
                <span>03</span>
                <strong>Medicine Reminders</strong>
                <b>→</b>
              </div>
            </div>
          </div>

          <div className="floating-card floating-top">
            <span>✓</span>
            <div>
              <strong>Stay Organized</strong>
              <small>Your health, simplified</small>
            </div>
          </div>

          <div className="floating-card floating-bottom">
            <div className="floating-pulse">+</div>
            <div>
              <strong>Better Care</strong>
              <small>Every step matters</small>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="landing-services" id="services">
        <div className="landing-section-heading">
          <span>WHAT WE OFFER</span>
          <h2>Everything Your Health Needs</h2>
          <p>Smart tools to make managing your healthcare easier.</p>
        </div>

        <div className="landing-services-grid">

          <div className="landing-service-card">
            <div className="service-number">01</div>
            <div className="service-icon">✚</div>
            <h3>Find Doctors</h3>
            <p>Explore doctors and find the right healthcare professional for your needs.</p>
          </div>

          <div className="landing-service-card">
            <div className="service-number">02</div>
            <div className="service-icon">▦</div>
            <h3>Appointments</h3>
            <p>Book, reschedule and manage your doctor appointments with ease.</p>
          </div>

          <div className="landing-service-card">
            <div className="service-number">03</div>
            <div className="service-icon">▤</div>
            <h3>Medical Records</h3>
            <p>Keep your medical reports and important health documents organized.</p>
           </div>

          <div className="landing-service-card">
            <div className="service-number">04</div>
            <div className="service-icon">＋</div>
            <h3>Medicine Tracker</h3>
            <p>Manage your medicines, dosage schedules and timely reminders.</p>
            
          </div>

        </div>
      </section>

      {/* About */}
      <section className="landing-about" id="about">
        <div className="about-symbol">+</div>

        <div>
          <span>HEALTHCARE, REIMAGINED</span>
          <h2>Making healthcare management simpler, one step at a time.</h2>
          <p>
            MediSync brings essential healthcare services together
            so you can spend less time managing things and more time
            focusing on your well-being.
          </p>
          <Link to="/signup">Start Your Journey →</Link>
        </div>
      </section>


     {/* Footer */}
<footer className="landing-footer" id="contact">

  <div className="footer-main">

    <div className="footer-brand">
      <Link to="/" className="landing-logo footer-logo">
        <span className="landing-logo-icon">+</span>
        <span>Medi<span>Sync</span></span>
      </Link>

      <p>
        Your health. Your records. Your care.
        Making healthcare management simpler and accessible.
      </p>
    </div>

    <div className="footer-column">
      <h3>Quick Links</h3>
      <a href="#home">Home</a>
      <a href="#services">Services</a>
      <a href="#about">About Us</a>
      <Link to="/login">Login</Link>
      <Link to="/signup">Sign Up</Link>
    </div>

    <div className="footer-column">
      <h3>Our Services</h3>
      <span>Find Doctors</span>
      <span>Appointments</span>
      <span>Medical Records</span>
      <span>Medicine Tracker</span>
      <span>Emergency Support</span>
    </div>

    <div className="footer-column">
      <h3>Contact Us</h3>
      <span>Email:  akansharma@gmail.com, <br/> prachidiwakar@gmail.com</span>
      <span>Phone: +91 9311601745,<br/> +91 9971298694</span>
      <span>Location: Delhi, India</span>
    </div>

  </div>

  <div className="footer-bottom">
    <p>© 2026 MediSync. All rights reserved.</p>
    <p>Designed for better healthcare management.</p>
  </div>

</footer>

    </div>
  )
}

export default App
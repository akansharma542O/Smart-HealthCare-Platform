import '../App.css'
import { Link } from 'react-router-dom'

function Emergency() {
  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon"><Icon name="heart" size={34} /></div>
          <h2>MediSync</h2>
        </div>

        <nav>
          <Link to="/dashboard"><Icon name="home" />Dashboard</Link>
          <Link to="/appointments"><Icon name="calendar" />Appointments</Link>
          <Link to="/doctors"><Icon name="doctor" />Doctors</Link>
          <Link to="/records"><Icon name="file" />Medical Records</Link>
          <Link to="/medicines"><Icon name="pill" />Medicines</Link>
          <Link to="/emergency" className="active"><Icon name="emergency" />Emergency</Link>
        </nav>

        <div className="sidebar-footer">
          <Icon name="heart" size={34} />
          <p>Better Care.<br />A Healthier You.</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main emergency-main">

        <div className="emergency-heading">
          <div>
            <span className="emergency-label">QUICK ASSISTANCE</span>
            <h1>Emergency Services</h1>
            <p>Quick access to emergency healthcare services.</p>
          </div>

          <div className="emergency-heading-icon">
            <Icon name="emergency" size={30} />
          </div>
        </div>

        {/* Ambulance */}
        <section className="emergency-card ambulance-card">
          <div className="emergency-card-icon">
            <Icon name="ambulance" size={30} />
          </div>

          <div className="emergency-card-content">
            <h3>Emergency Ambulance</h3>
            <p>Get immediate access to emergency ambulance services.</p>
            <a href="tel:112" className="emergency-call-btn">
              <Icon name="phone" size={18} />
              Call Emergency: 112
            </a>
          </div>
        </section>

        {/* Nearby Hospitals */}
        <section className="emergency-card">
          <div className="emergency-card-icon">
            <Icon name="hospital" size={30} />
          </div>

          <div className="emergency-card-content">
            <h3>Nearby Hospitals</h3>
            <p>Find hospitals near your location during emergencies.</p>

            <a
              href="https://www.google.com/maps/search/hospitals+near+me/"
              target="_blank"
              rel="noreferrer"
              className="emergency-map-btn"
            >
              <Icon name="location" size={18} />
              Find Nearby Hospitals
            </a>
          </div>
        </section>

        {/* Emergency Contacts */}
        <section className="emergency-card">
          <div className="emergency-card-content emergency-contacts-content">
            <h3>Emergency Contacts</h3>
            <p>Important helpline numbers for immediate assistance.</p>

            <div className="emergency-contact-list">
              <div className="emergency-contact-item">
                <div>
                  <strong>National Emergency</strong>
                  <span>Police, Fire & Emergency Assistance</span>
                </div>
                <a href="tel:112">112</a>
              </div>

              <div className="emergency-contact-item">
                <div>
                  <strong>Ambulance</strong>
                  <span>Medical Emergency Services</span>
                </div>
                <a href="tel:108">108</a>
              </div>

              <div className="emergency-contact-item">
                <div>
                  <strong>Women Helpline</strong>
                  <span>Women Safety & Assistance</span>
                </div>
                <a href="tel:181">181</a>
              </div>
            </div>
          </div>
        </section>

        <div className="emergency-note">
          <Icon name="shield" size={20} />
          <p>In case of a life-threatening emergency, contact emergency services immediately.</p>
        </div>

      </main>
    </div>
  )
}

// Sidebar and Emergency Icons
function Icon({ name, size = 24 }) {
  const icons = {
    home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1z" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    doctor: <><path d="M6 3v5a4 4 0 0 0 8 0V3M10 12v2a5 5 0 0 0 10 0v-2" /><circle cx="20" cy="10" r="2" /><path d="M4 3h4" /></>,
    file: <><path d="M5 3h9l5 5v13H5z" /><path d="M14 3v5h5M8 13h8M8 17h8" /></>,
    pill: <><path d="m4 14 7-7a5 5 0 0 1 7 7l-7 7a5 5 0 0 1-7-7z" /><path d="m8 10 7 7" /></>,
    heart: <><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8z" /></>,
    emergency: <><path d="M12 3 2.5 20h19z" /><path d="M12 9v5M12 17h.01" /></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z" /><path d="M12 8v8M8 12h8" /></>,
    phone: <><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z" /></>,
    ambulance: <><path d="M3 7h11v12H3zM14 11h4l3 4v4h-7z" /><circle cx="7.5" cy="19" r="2" /><circle cx="18" cy="19" r="2" /><path d="M8.5 10v5M6 12.5h5" /></>,
    hospital: <><path d="M3 21V5h18v16M1 21h22M9 21v-5h6v5" /><path d="M12 8v5M9.5 10.5h5" /></>,
    location: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0z" /><circle cx="12" cy="10" r="2.5" /></>
  }

  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  )
}

export default Emergency
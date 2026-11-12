import '../App.css'
import { Link } from 'react-router-dom'

function Emergency() {
  return (
    <div className="dashboard-container">

      <aside className="sidebar">
        <h2>HealthCare</h2>

        <nav>
          <Link to="/dashboard">🏠 Dashboard</Link>
          <Link to="/doctors">🩺 Find Doctors</Link>
          <Link to="/appointments">📅 Appointments</Link>
          <Link to="/records">📋 Medical Records</Link>
          <Link to="/medicines">💊 Medicine Tracker</Link>
          <Link to="/emergency" className="active">🚨 Emergency</Link>
        </nav>
      </aside>

      <main className="dashboard-main">

        <div className="dashboard-header">
          <h1>Emergency Services 🚨</h1>
          <p>Quick access to emergency healthcare services.</p>
        </div>

        <div className="bottom-card">
          <h3>Emergency Ambulance</h3>
          <p>Get access to emergency ambulance services.</p>
          <a href="tel:112">Call Emergency: 112</a>
        </div>

        <div className="bottom-card">
          <h3>Nearby Hospitals</h3>
          <p>Find hospitals near your location during emergencies.</p>
        </div>

        <div className="bottom-card">
          <h3>Emergency Contacts</h3>
          <p>Emergency contact details will appear here.</p>
        </div>

      </main>
    </div>
  )
}

export default Emergency
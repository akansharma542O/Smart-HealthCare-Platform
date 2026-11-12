import '../App.css'
import { Link } from 'react-router-dom'

function Appointments() {
  return (
    <div className="dashboard-container">

      <aside className="sidebar">
        <h2>HealthCare</h2>

        <nav>
          <Link to="/dashboard">🏠 Dashboard</Link>
          <Link to="/doctors">🩺 Find Doctors</Link>
          <Link to="/appointments" className="active">📅 Appointments</Link>
          <Link to="/records">📋 Medical Records</Link>
          <Link to="/medicines">💊 Medicine Tracker</Link>
          <Link to="/emergency">🚨 Emergency</Link>
        </nav>
      </aside>

      <main className="dashboard-main">

        <div className="dashboard-header">
          <h1>My Appointments 📅</h1>
          <p>Manage your doctor appointments in one place.</p>
        </div>

        <div className="bottom-card">
          <h3>Upcoming Appointments</h3>
          <p>Your upcoming appointments will appear here.</p>
        </div>

        <div className="bottom-card">
          <h3>Appointment History</h3>
          <p>Your previous appointments will appear here.</p>
        </div>

        <div className="bottom-card">
          <h3>Book a New Appointment</h3>
          <p>Find a doctor and schedule your next appointment.</p>
          <Link to="/doctors">Find Doctors →</Link>
        </div>

      </main>
    </div>
  )
}

export default Appointments
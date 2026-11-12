import '../App.css'
import { Link } from 'react-router-dom'

function Doctors() {
  return (
    <div className="dashboard-container">

      <aside className="sidebar">
        <h2>HealthCare</h2>

        <nav>
          <Link to="/dashboard">🏠 Dashboard</Link>
          <Link to="/doctors" className="active">🩺 Find Doctors</Link>
          <Link to="/appointments">📅 Appointments</Link>
          <Link to="/records">📋 Medical Records</Link>
          <Link to="/medicines">💊 Medicine Tracker</Link>
          <Link to="/emergency">🚨 Emergency</Link>
        </nav>
      </aside>

      <main className="dashboard-main">

        <div className="dashboard-header">
          <h1>Find Doctors 🩺</h1>
          <p>Find the right healthcare professional for your needs.</p>
        </div>

        <div className="doctor-search">
          <input
            type="text"
            placeholder="Search by doctor name or specialty..."
          />

          <select>
            <option value="">All Specialties</option>
            <option>Cardiologist</option>
            <option>Dermatologist</option>
            <option>Neurologist</option>
            <option>General Physician</option>
            <option>Orthopedic</option>
          </select>
        </div>

        <div className="doctors-list">
          <div className="bottom-card">
            <h3>👨‍⚕️ Available Doctors</h3>
            <p>Doctor profiles and availability will appear here.</p>
          </div>
        </div>

      </main>
    </div>
  )
}

export default Doctors
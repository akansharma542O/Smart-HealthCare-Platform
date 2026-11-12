import '../App.css'
import { Link } from 'react-router-dom'

function MedicalRecords() {
  return (
    <div className="dashboard-container">

      <aside className="sidebar">
        <h2>HealthCare</h2>

        <nav>
          <Link to="/dashboard">🏠 Dashboard</Link>
          <Link to="/doctors">🩺 Find Doctors</Link>
          <Link to="/appointments">📅 Appointments</Link>
          <Link to="/records" className="active">📋 Medical Records</Link>
          <Link to="/medicines">💊 Medicine Tracker</Link>
          <Link to="/emergency">🚨 Emergency</Link>
        </nav>
      </aside>

      <main className="dashboard-main">

        <div className="dashboard-header">
          <h1>Medical Records 📋</h1>
          <p>Store and manage your medical reports and health documents.</p>
        </div>

        <div className="bottom-card">
          <h3>Upload Medical Records</h3>
          <p>Upload prescriptions, test reports and other medical documents.</p>
          <input type="file" />
        </div>

        <div className="bottom-card">
          <h3>My Records</h3>
          <p>Your uploaded medical records will appear here.</p>
        </div>

      </main>
    </div>
  )
}

export default MedicalRecords
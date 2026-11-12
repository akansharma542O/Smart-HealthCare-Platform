import '../App.css'
import { Link } from 'react-router-dom'

function Medicines() {
  return (
    <div className="dashboard-container">

      <aside className="sidebar">
        <h2>HealthCare</h2>

        <nav>
          <Link to="/dashboard">🏠 Dashboard</Link>
          <Link to="/doctors">🩺 Find Doctors</Link>
          <Link to="/appointments">📅 Appointments</Link>
          <Link to="/records">📋 Medical Records</Link>
          <Link to="/medicines" className="active">💊 Medicine Tracker</Link>
          <Link to="/emergency">🚨 Emergency</Link>
        </nav>
      </aside>

      <main className="dashboard-main">

        <div className="dashboard-header">
          <h1>Medicine Tracker 💊</h1>
          <p>Manage your medicines, dosage and medication schedule.</p>
        </div>

        <div className="bottom-card">
          <h3>Add a Medicine</h3>
          <p>Add medicine details and set your dosage schedule.</p>

          <input type="text" placeholder="Medicine Name" />
          <input type="text" placeholder="Dosage (e.g. 500 mg)" />
          <input type="text" placeholder="Frequency (e.g. Twice a day)" />
          <input type="time" />
          <button>Add Medicine</button>
        </div>

        <div className="bottom-card">
          <h3>My Medicines</h3>
          <p>Your medicine list and reminders will appear here.</p>
        </div>

        <div className="bottom-card">
          <h3>Prescription Extraction</h3>
          <p>Upload a prescription to extract medicine details automatically.</p>
          <input type="file" accept="image/*,.pdf" />
        </div>

      </main>
    </div>
  )
}

export default Medicines
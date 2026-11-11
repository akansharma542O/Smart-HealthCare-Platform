import '../App.css'
import { Link } from 'react-router-dom'

function Dashboard() {
  return (
       <div className="dashboard-container">
         <aside className="sidebar">
         <h2>HealthCare</h2>

         {/* Sidebar Navigation Links */}
          <nav>
           <Link to="/dashboard" className="active">🏠 Dashboard</Link>
           <Link to="/doctors">🩺 Find Doctors</Link>
           <Link to="/appointments">📅 Appointments</Link>
           <Link to="/records">📋 Medical Records</Link>
           <Link to="/medicines">💊 Medicine Tracker</Link>
           <Link to="/emergency">🚨 Emergency</Link>
         </nav>
         </aside>

         <main className="dashboard-main">
          <div className="dashboard-topbar">

            <input
            type="text"
            placeholder="Search doctors, specialties..."
            />

          <div className="user-profile">
            <span>🔔</span>
            <span>👤 Akansha</span>
          </div>

        </div>
        <div className="dashboard-header">
            <h1>Welcome back! 👋</h1>
            <p>Your health is our priority. Take care!</p>

            <div className="dashboard-date">
               📅 {new Date().toDateString()}
            </div>
        </div>
        <div className="health-overview">

           <div className="overview-card">
             <span>📅</span>
             <div>
                <h2>0</h2>
                <p>Upcoming Appointments</p>
             </div>
            </div>

            <div className="overview-card">
              <span>📋</span>
              <div>
                <h2>0</h2>
                <p>Medical Records</p>
               </div>
            </div>

            <div className="overview-card">
              <span>💊</span>
              <div>
                <h2>0</h2>
                <p>Medicines to Track</p>
              </div>
            </div>

            <div className="overview-card">
              <span>💙</span>
              <div>
                <h2>Welcome!</h2>
                <p>Your health matters to us.</p>
              </div>
            </div>

        </div>
        <div className="dashboard-cards">

         <Link to="/appointments" className="dashboard-card">
          <h3>📅 Appointments</h3>
          <p>View and manage your appointments.</p>
         </Link>

         <Link to="/doctors" className="dashboard-card">
          <h3>🩺 Find a Doctor</h3>
          <p>Discover doctors and healthcare specialists.</p>
         </Link>

         <Link to="/records" className="dashboard-card">
          <h3>📋 Medical Records</h3>
          <p>Access your medical reports and prescriptions.</p>
         </Link>

         <Link to="/medicines" className="dashboard-card">
          <h3>💊 Medicine Tracker</h3>
          <p>Keep track of your medicines and reminders.</p>
         </Link>

        </div> 
        <div className="dashboard-bottom">

           <div className="bottom-card">
             <h3>📅 Upcoming Appointments</h3>
             <p>You don't have any upcoming appointments.</p>
             <Link to="/appointments">View All Appointments →</Link>
           </div>
           {/* Health Insights Section */}
           <div className="bottom-card">
             <h3>💙 Health Insights</h3>
             <p>Stay updated with your health and wellness.</p>
             <p>Remember to maintain a healthy lifestyle!</p>
           </div>
        </div>  
      </main>

    </div>
  )
}

export default Dashboard
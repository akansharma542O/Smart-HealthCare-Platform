import { Link, useNavigate } from 'react-router-dom'
import '../App.css'
import { useState, useEffect } from 'react'

function Icon({ name, size = 24 }) {
  const icons = {
    home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1z" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    doctor: <><path d="M6 3v5a4 4 0 0 0 8 0V3M10 12v2a5 5 0 0 0 10 0v-2" /><circle cx="20" cy="10" r="2" /><path d="M4 3h4" /></>,
    file: <><path d="M5 3h9l5 5v13H5z" /><path d="M14 3v5h5M8 13h8M8 17h8" /></>,
    pill: <><path d="m4 14 7-7a5 5 0 0 1 7 7l-7 7a5 5 0 0 1-7-7z" /><path d="m8 10 7 7" /></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z" /><path d="M12 8v8M8 12h8" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4" /></>,
    heart: <><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8z" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    emergency: <><path d="M12 3 2.5 20h19z" /><path d="M12 9v5M12 17h.01" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>
  }

  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  )
}

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const navigate = useNavigate()
const [searchQuery, setSearchQuery] = useState('')
const [showSuggestions, setShowSuggestions] = useState(false)

const searchPages = [
  { name: 'Appointments', keywords: 'appointment booking schedule', link: '/appointments' },
  { name: 'Doctors', keywords: 'doctor specialist specialty hospital', link: '/doctors' },
  { name: 'Medical Records', keywords: 'records reports prescriptions', link: '/records' },
  { name: 'Medicines', keywords: 'medicine tracker dosage reminders', link: '/medicines' },
  { name: 'Emergency', keywords: 'emergency ambulance urgent help', link: '/emergency' }
]

const filteredPages = searchPages.filter(page =>
  `${page.name} ${page.keywords}`.toLowerCase().includes(searchQuery.toLowerCase())
)

const handleSearch = (page) => {
  navigate(page.link)
  setSearchQuery('')
  setShowSuggestions(false)
}

  const [stats, setStats] = useState({
    appointments: 0,
    records: 0,
    medicines: 0
  })

  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    if (!user.id) return

    fetch(`http://localhost:5000/dashboard-stats/${user.id}`)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.log(err))
  }, [user.id])

  useEffect(() => {
    if (!user.id) return

    fetch(`http://localhost:5000/appointments/${user.id}`)
      .then(res => res.json())
      .then(data => setAppointments(data))
      .catch(err => console.log(err))
  }, [user.id])

  const today = new Date().toLocaleDateString('en-CA')

  const upcomingAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.appointment_date)
      .toLocaleDateString('en-CA')

    return appointmentDate >= today &&
      appointment.status !== 'Cancelled'
  })

  const features = [
    {
      title: 'Appointments',
      description: 'View and manage your appointments.',
      button: 'Book Now',
      link: '/appointments',
      icon: 'calendar'
    },
    {
      title: 'Find a Doctor',
      description: 'Discover doctors and healthcare specialists.',
      button: 'Search Doctors',
      link: '/doctors',
      icon: 'doctor'
    },
    {
      title: 'Medical Records',
      description: 'Access your medical reports and prescriptions.',
      button: 'View Records',
      link: '/records',
      icon: 'file'
    },
    {
      title: 'Medicine Tracker',
      description: 'Keep track of your medicines and reminders.',
      button: 'Track Now',
      link: '/medicines',
      icon: 'pill'
    }
  ]

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon"><Icon name="heart" size={34} /></div>
          <h2>MediSync</h2>
        </div>

        <nav>
          <Link to="/dashboard" className="active"><Icon name="home" />Dashboard</Link>
          <Link to="/appointments"><Icon name="calendar" />Appointments</Link>
          <Link to="/doctors"><Icon name="doctor" />Doctors</Link>
          <Link to="/records"><Icon name="file" />Medical Records</Link>
          <Link to="/medicines"><Icon name="pill" />Medicines</Link>
          <Link to="/emergency"><Icon name="emergency" />Emergency</Link>
        </nav>

        <div className="sidebar-footer">
          <Icon name="heart" size={34} />
          <p>Better Care.<br />A Healthier You.</p>
        </div>
      </aside>

      {/* Main Dashboard */}
      <main className="dashboard-main">

        {/* Topbar */}
        <div className="dashboard-topbar">
          <div className="dashboard-search-wrapper">
  <div className="dashboard-search">
    <Icon name="search" />
    <input
      type="text"
      placeholder="Search pages and features..."
      value={searchQuery}
      onChange={(e) => {
        setSearchQuery(e.target.value)
        setShowSuggestions(true)
      }}
      onFocus={() => setShowSuggestions(true)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && filteredPages.length > 0) {
          handleSearch(filteredPages[0])
        }
        if (e.key === 'Escape') setShowSuggestions(false)
      }}
    />
  </div>

  {showSuggestions && searchQuery.trim() && (
    <div className="search-suggestions">
      {filteredPages.length > 0 ? (
        filteredPages.map(page => (
          <button
            key={page.name}
            onClick={() => handleSearch(page)}
          >
            {page.name}
            <Icon name="arrow" size={16} />
          </button>
        ))
      ) : (
        <p>No matching pages found.</p>
      )}
    </div>
  )}
</div>

          <div className="user-profile">
            <span className="notification-icon"><Icon name="bell" /></span>
            <div className="profile-avatar">
              {(user.name || 'U').charAt(0).toUpperCase()}
            </div>
            <span>{user.name || 'User'}</span>
          </div>
        </div>

        {/* Welcome Header */}
        <section className="dashboard-header">
          <div className="welcome-content">
            <h1>Welcome back, {user.name || 'User'}!</h1>
            <p>Your health is our priority. Take care!</p>
            <div className="dashboard-date">
              <Icon name="calendar" size={18} />
              {new Date().toLocaleDateString('en-IN', {
                weekday: 'long',
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </div>
          </div>

          <div className="welcome-illustration">
            <div className="illustration-circle">
              <Icon name="heart" size={100} />
              <span className="pulse-line">+</span>
            </div>
            <div className="illustration-cross">+</div>
          </div>
        </section>

        {/* Overview Cards */}
        <section className="health-overview">

          <div className="overview-card">
            <span className="overview-icon blue"><Icon name="calendar" size={28} /></span>
            <div>
              <h2>{stats.appointments}</h2>
              <p>Upcoming Appointments</p>
            </div>
          </div>

          <div className="overview-card">
            <span className="overview-icon purple"><Icon name="file" size={28} /></span>
            <div>
              <h2>{stats.records}</h2>
              <p>Medical Records</p>
            </div>
          </div>

          <div className="overview-card">
            <span className="overview-icon green"><Icon name="pill" size={28} /></span>
            <div>
              <h2>{stats.medicines}</h2>
              <p>Medicines to Track</p>
            </div>
          </div>

          <div className="overview-card">
            <span className="overview-icon pink"><Icon name="shield" size={28} /></span>
            <div>
              <h2>Good Health!</h2>
              <p>Stay Healthy & Happy</p>
            </div>
          </div>

        </section>

        {/* Feature Cards */}
        <section className="dashboard-cards">
          {features.map(feature => (
            <Link to={feature.link} className="dashboard-card" key={feature.title}>
              <div className="feature-illustration">
                <Icon name={feature.icon} size={64} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <span className="feature-button">
                {feature.button} <Icon name="arrow" size={17} />
              </span>
            </Link>
          ))}
        </section>

        {/* Bottom Cards */}
        <section className="dashboard-bottom">

          <div className="bottom-card">
            <div className="bottom-card-heading">
              <h3><Icon name="calendar" />Upcoming Appointments</h3>
              <Link to="/appointments">View All <Icon name="arrow" size={16} /></Link>
            </div>

            {upcomingAppointments.length === 0 ? (
              <p className="empty-message">No upcoming appointments.</p>
            ) : (
              upcomingAppointments.slice(0, 1).map(appointment => (
                <div className="appointment-preview" key={appointment.id}>
                  <div className="doctor-avatar"><Icon name="doctor" size={30} /></div>
                  <div className="appointment-doctor">
                    <h4>{appointment.doctor_name}</h4>
                    <p>{appointment.specialty}</p>
                  </div>
                  <div className="appointment-date">
                    <p>{new Date(appointment.appointment_date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}</p>
                    <p>{new Date(`2000-01-01T${String(appointment.appointment_time).slice(0, 5)}:00`).toLocaleTimeString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit'
                    })}</p>
                  </div>
                  <span className={`status-badge ${appointment.status?.toLowerCase()}`}>
                    {appointment.status}
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="bottom-card">
            <div className="bottom-card-heading">
              <h3><Icon name="heart" />Your Health Insights</h3>
            </div>

            <div className="health-insight-content">
              <div className="insight-heart"><Icon name="heart" size={32} /></div>
              <div>
                <h4>Take care of yourself!</h4>
                <p>Keep taking your medicines on time and stay active.</p>
              </div>
            </div>
          </div>

        </section>
      </main>
    </div>
  )
}

export default Dashboard
import '../App.css'
import { Link } from 'react-router-dom'
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

function Doctors() {
  const [doctors, setDoctors] = useState([])
  const [search, setSearch] = useState('')
  const [specialty, setSpecialty] = useState('')

  useEffect(() => {
    fetch('http://localhost:5000/doctors')
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(err => console.log(err))
  }, [])

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(search.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(search.toLowerCase())

    const matchesSpecialty =
      specialty === '' || doctor.specialty === specialty

    return matchesSearch && matchesSpecialty
  })

  return (
    <div className="dashboard-container">

      
      {/* Sidebar */}
<aside className="sidebar">
  <div className="sidebar-brand">
    <div className="brand-icon">
      <Icon name="heart" size={34} />
    </div>
    <h2>MediSync</h2>
  </div>

  <nav>
    <Link to="/dashboard"><Icon name="home" />Dashboard</Link>
    <Link to="/appointments"><Icon name="calendar" />Appointments</Link>
    <Link to="/doctors" className="active"><Icon name="doctor" />Doctors</Link>
    <Link to="/records"><Icon name="file" />Medical Records</Link>
    <Link to="/medicines"><Icon name="pill" />Medicines</Link>
    <Link to="/emergency"><Icon name="emergency" />Emergency</Link>
  </nav>

  <div className="sidebar-footer">
    <Icon name="heart" size={34} />
    <p>Better Care.<br />A Healthier You.</p>
  </div>
</aside>

      {/* Doctors Main Content */}
      <main className="dashboard-main doctors-main">

        <div className="doctors-page-heading">
          <div>
            <span className="doctors-eyebrow">HEALTHCARE DIRECTORY</span>
            <h1>Find Doctors</h1>
            <p>Find the right healthcare professional for your needs.</p>
          </div>

          <div className="doctors-heading-icon">
            <Icon name="doctor" size={48} />
          </div>
        </div>

        {/* Search and Filter */}
        <div className="doctor-search doctors-toolbar">
          <div className="doctor-search-input">
            <Icon name="search" />
            <input
              type="text"
              placeholder="Search by doctor name or specialty..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <select
            value={specialty}
            onChange={e => setSpecialty(e.target.value)}
          >
            <option value="">All Specialties</option>
            <option>Cardiologist</option>
            <option>Dermatologist</option>
            <option>Neurologist</option>
            <option>General Physician</option>
            <option>Orthopedic</option>
          </select>
        </div>

        {/* Doctor Results */}
        <div className="doctors-list">
          <div className="doctors-list-heading">
            <div>
              <h2>Available Doctors</h2>
              <p>Choose a specialist for your healthcare needs.</p>
            </div>
            <span>{filteredDoctors.length} Doctors Available</span>
          </div>

          {filteredDoctors.length === 0 ? (
            <div className="doctors-empty">
              <Icon name="search" size={35} />
              <h3>No doctors found</h3>
              <p>Try another name or specialty.</p>
            </div>
          ) : (
            <div className="doctors-grid">
              {filteredDoctors.map(doctor => (
                <div className="doctor-profile-card" key={doctor.id}>

                  <div className="doctor-card-top">
                    <div className="doctor-profile-avatar">
                      {doctor.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="doctor-available">Available</span>
                  </div>

                  <h3>{doctor.name}</h3>
                  <span className="doctor-specialty">{doctor.specialty}</span>

                  <div className="doctor-details">
                    <p><strong>Qualification</strong><span>{doctor.qualification}</span></p>
                    <p><strong>Hospital</strong><span>{doctor.hospital}</span></p>
                    <p><strong>Location</strong><span>{doctor.location}</span></p>
                    <p><strong>Experience</strong><span>{doctor.experience} years</span></p>
                  </div>

                  <div className="doctor-card-footer">
                    <div>
                      <small>Consultation Fee</small>
                      <h3>₹{doctor.consultation_fee}</h3>
                    </div>
                    <Link to="/appointments">Book Appointment →</Link>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  )
}

export default Doctors
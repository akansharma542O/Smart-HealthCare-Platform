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
    emergency: <><path d="M12 3 2.5 20h19z" /><path d="M12 9v5M12 17h.01" /></>,
    heart: <><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8z" /></>,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>
  }

  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  )
}

function Appointments() {
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const [doctors, setDoctors] = useState([])
  const [doctorId, setDoctorId] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [reason, setReason] = useState('')
  const [appointments, setAppointments] = useState([])
  const [availableSlots, setAvailableSlots] = useState([])
  const [rescheduleSlots, setRescheduleSlots] = useState({})

  useEffect(() => {
    fetch('http://localhost:5000/doctors')
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    if (!doctorId || !date) {
      setAvailableSlots([])
      setTime('')
      return
    }

    fetch(`http://localhost:5000/available-slots?doctor_id=${doctorId}&date=${date}`)
      .then(res => res.json())
      .then(data => setAvailableSlots(data))
      .catch(err => console.log(err))
  }, [doctorId, date])

  const handleBooking = async (e) => {
    e.preventDefault()

    const response = await fetch('http://localhost:5000/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: user.id,
        doctor_id: doctorId,
        appointment_date: date,
        appointment_time: time,
        reason: reason
      })
    })

    const data = await response.json()
    alert(data.message)
  }

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

  const pastAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.appointment_date)
      .toLocaleDateString('en-CA')

    return appointmentDate < today ||
      appointment.status === 'Cancelled'
  })

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
          <Link to="/appointments" className="active"><Icon name="calendar" />Appointments</Link>
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

      {/* Main Appointments Page */}
      <main className="dashboard-main appointments-main">

        {/* Page Heading */}
        <div className="appointments-heading">
          <div>
            <span className="appointments-label">HEALTHCARE SERVICES</span>
            <h1>My Appointments</h1>
            <p>Book and manage your doctor appointments in one place.</p>
          </div>
          <div className="appointments-heading-icon">
            <Icon name="calendar" size={48} />
          </div>
        </div>

        {/* Booking Form */}
        <section className="appointment-section booking-section">
          <div className="appointment-section-title">
            <div className="section-icon"><Icon name="calendar" /></div>
            <div>
              <h2>Book a New Appointment</h2>
              <p>Choose your doctor and preferred appointment slot.</p>
            </div>
          </div>

          <form className="appointment-form" onSubmit={handleBooking}>
            <div className="appointment-form-grid">

              <div className="appointment-field">
                <label>Select Doctor</label>
                <select
                  value={doctorId}
                  onChange={(e) => setDoctorId(e.target.value)}
                  required
                >
                  <option value="">Choose a Doctor</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialty}
                    </option>
                  ))}
                </select>
              </div>

              <div className="appointment-field">
                <label>Appointment Date</label>
                <input
                  type="date"
                  value={date}
                  min={new Date().toLocaleDateString('en-CA')}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>

              <div className="appointment-field">
                <label>Available Time Slots</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                >
                  <option value="">Select a Time Slot</option>
                  {availableSlots.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>

              <div className="appointment-field">
                <label>Reason for Visit</label>
                <input
                  type="text"
                  placeholder="Enter reason for appointment"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                />
              </div>

            </div>

            <button type="submit" className="appointment-primary-btn">
              Book Appointment <Icon name="arrow" size={18} />
            </button>
          </form>
        </section>

        {/* Upcoming Appointments */}
        <section className="appointment-section">
          <div className="appointment-section-title">
            <div className="section-icon"><Icon name="clock" /></div>
            <div>
              <h2>Upcoming Appointments</h2>
              <p>{upcomingAppointments.length} appointments scheduled</p>
            </div>
          </div>

          {upcomingAppointments.length === 0 ? (
            <p className="appointment-empty">No upcoming appointments.</p>
          ) : (
            <div className="appointment-list">
              {upcomingAppointments.map(appointment => (
                <div className="appointment-item" key={appointment.id}>

                  <div className="appointment-item-header">
                    <div className="appointment-doctor-icon">
                      <Icon name="doctor" size={30} />
                    </div>
                    <div className="appointment-doctor-info">
                      <h3>{appointment.doctor_name}</h3>
                      <p>{appointment.specialty}</p>
                    </div>
                    <span className={`appointment-status ${appointment.status?.toLowerCase()}`}>
                      {appointment.status}
                    </span>
                  </div>

                  <div className="appointment-meta">
                    <p><Icon name="calendar" size={17} />{String(appointment.appointment_date).slice(0, 10)}</p>
                    <p><Icon name="clock" size={17} />{appointment.appointment_time}</p>
                  </div>

                  <div className="reschedule-area">
                    <h4>Reschedule Appointment</h4>

                    <div className="reschedule-controls">
                      <input
                        type="date"
                        id={`date-${appointment.id}`}
                        min={new Date().toLocaleDateString('en-CA')}
                        onChange={async (e) => {
                          const selectedDate = e.target.value

                          const response = await fetch(
                            `http://localhost:5000/available-slots?doctor_id=${appointment.doctor_id}&date=${selectedDate}`
                          )

                          const data = await response.json()

                          setRescheduleSlots(prev => ({
                            ...prev,
                            [appointment.id]: data
                          }))
                        }}
                      />

                      <select id={`time-${appointment.id}`} required>
                        <option value="">Select Available Slot</option>
                        {(rescheduleSlots[appointment.id] || []).map(slot => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>

                    <div className="appointment-actions">
                      <button className="reschedule-btn" onClick={async () => {
                        const appointment_date = document.getElementById(`date-${appointment.id}`).value
                        const appointment_time = document.getElementById(`time-${appointment.id}`).value

                        if (!appointment_date || !appointment_time) {
                          alert('Please select date and time.')
                          return
                        }

                        const response = await fetch(
                          `http://localhost:5000/appointments/reschedule/${appointment.id}`,
                          {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ appointment_date, appointment_time })
                          }
                        )

                        const data = await response.json()
                        alert(data.message)
                        window.location.reload()
                      }}>
                        Reschedule
                      </button>

                      <button className="cancel-appointment-btn" onClick={async () => {
                        const response = await fetch(
                          `http://localhost:5000/appointments/cancel/${appointment.id}`,
                          { method: 'PUT' }
                        )

                        const data = await response.json()
                        alert(data.message)
                        window.location.reload()
                      }}>
                        Cancel Appointment
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </section>

        {/* Appointment History */}
        <section className="appointment-section">
          <div className="appointment-section-title">
            <div className="section-icon"><Icon name="file" /></div>
            <div>
              <h2>Appointment History</h2>
              <p>Your previous and cancelled appointments.</p>
            </div>
          </div>

          {pastAppointments.length === 0 ? (
            <p className="appointment-empty">No appointment history yet.</p>
          ) : (
            <div className="appointment-list history-list">
              {pastAppointments.map(appointment => (
                <div className="appointment-history-item" key={appointment.id}>
                  <div>
                    <h3>{appointment.doctor_name}</h3>
                    <p>{appointment.specialty}</p>
                    <span>{String(appointment.appointment_date).slice(0, 10)}</span>
                  </div>
                  <span className={`appointment-status ${appointment.status?.toLowerCase()}`}>
                    {appointment.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  )
}

export default Appointments
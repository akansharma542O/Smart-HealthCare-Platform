import '../App.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Medicines() {
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const [medicines, setMedicines] = useState([])
  const [name, setName] = useState('')
  const [dosage, setDosage] = useState('')
  const [frequency, setFrequency] = useState('')
  const [time, setTime] = useState('')
  const [secondTime, setSecondTime] = useState('')

  // Add Medicine
  const handleAddMedicine = async () => {
    if (!name || !dosage || !frequency || !time) {
      return alert('Please fill all required fields')
    }

    if ("Notification" in window && Notification.permission === "default") {
      await Notification.requestPermission()
    }

    const response = await fetch('http://localhost:5000/medicines', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: user.id,
        medicine_name: name,
        dosage,
        frequency,
        times: secondTime ? [time, secondTime] : [time]
      })
    })

    const data = await response.json()
    alert(data.message)

    if (response.ok) {
      setName('')
      setDosage('')
      setFrequency('')
      setTime('')
      setSecondTime('')

      fetch(`http://localhost:5000/medicines/${user.id}`)
        .then(res => res.json())
        .then(data => setMedicines(data))
    }
  }

  // Delete Medicine
  const handleDeleteMedicine = async (id) => {
    const response = await fetch(`http://localhost:5000/medicines/${id}`, {
      method: 'DELETE'
    })

    const data = await response.json()
    alert(data.message)

    setMedicines(prev => prev.filter(medicine => medicine.id !== id))
  }

  // Mark Medicine as Taken
  const handleMarkTaken = async (id) => {
    const response = await fetch(`http://localhost:5000/medicines/taken/${id}`, {
      method: 'POST'
    })

    const data = await response.json()
    alert(data.message)
  }

  // Fetch Medicines
  useEffect(() => {
    if (!user.id) return

    fetch(`http://localhost:5000/medicines/${user.id}`)
      .then(res => res.json())
      .then(data => setMedicines(data))
      .catch(err => console.log(err))
  }, [user.id])

  // Medicine Alarm
  const playAlarm = () => {
    const audio = new AudioContext()
    const oscillator = audio.createOscillator()
    const gain = audio.createGain()

    oscillator.connect(gain)
    gain.connect(audio.destination)

    oscillator.frequency.value = 880
    gain.gain.value = 0.3

    oscillator.start()

    setTimeout(() => {
      oscillator.stop()
      audio.close()
    }, 2000)
  }

  // Check Medicine Reminders
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date()
      const currentTime = now.toTimeString().slice(0, 5)
      const today = now.toLocaleDateString()

      medicines.forEach(medicine => {
        const doseTime = String(medicine.dose_time).slice(0, 5)
        const reminderKey = `reminded-${medicine.id}-${doseTime}-${today}`

        if (
          doseTime === currentTime &&
          !localStorage.getItem(reminderKey)
        ) {
          playAlarm()

          if ("Notification" in window && Notification.permission === "granted") {
            new Notification('Medicine Reminder 💊', {
              body: `Time to take ${medicine.medicine_name} (${medicine.dosage})`
            })
          }

          localStorage.setItem(reminderKey, 'true')
        }
      })
    }

    const interval = setInterval(checkReminders, 15000)
    checkReminders()

    return () => clearInterval(interval)
  }, [medicines])

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
          <Link to="/medicines" className="active"><Icon name="pill" />Medicines</Link>
          <Link to="/emergency"><Icon name="emergency" />Emergency</Link>
        </nav>

        <div className="sidebar-footer">
          <Icon name="heart" size={34} />
          <p>Better Care.<br />A Healthier You.</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main medicines-main">

        <div className="medicines-heading">
          <div>
            <span className="medicines-label">MEDICATION MANAGEMENT</span>
            <h1>Medicine Tracker</h1>
            <p>Manage your medicines, dosage and medication schedule.</p>
          </div>

          <div className="medicines-heading-icon">
            <Icon name="pill" size={30} />
          </div>
        </div>

        {/* Add Medicine Form */}
        <section className="medicines-card">
          <div className="medicines-section-title">
            <div className="medicines-icon">
              <Icon name="pill" size={22} />
            </div>
            <div>
              <h3>Add a Medicine</h3>
              <p>Add medicine details and set your dosage schedule.</p>
            </div>
          </div>

          <div className="medicine-form-grid">
            <div className="medicine-field">
              <label>Medicine Name</label>
              <input type="text" placeholder="e.g. Paracetamol" value={name} onChange={(e) => setName(e.target.value)} />
            </div>

            <div className="medicine-field">
              <label>Dosage</label>
              <input type="text" placeholder="e.g. 500 mg" value={dosage} onChange={(e) => setDosage(e.target.value)} />
            </div>

            <div className="medicine-field">
              <label>Frequency</label>
              <input type="text" placeholder="e.g. Twice a day" value={frequency} onChange={(e) => setFrequency(e.target.value)} />
            </div>

            <div className="medicine-field">
              <label>First Reminder</label>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>

            <div className="medicine-field">
              <label>Second Reminder (Optional)</label>
              <input type="time" value={secondTime} onChange={(e) => setSecondTime(e.target.value)} />
            </div>
          </div>

          <button className="medicine-add-btn" onClick={handleAddMedicine}>
            + Add Medicine
          </button>
        </section>

        {/* Medicine List */}
        <section className="medicines-card">
          <div className="medicines-section-title">
            <div className="medicines-icon">
              <Icon name="file" size={22} />
            </div>
            <div>
              <h3>My Medicines</h3>
              <p>Your current medication schedule.</p>
            </div>
            <span className="medicine-count">{medicines.length} Medicines</span>
          </div>

          {medicines.length === 0 ? (
            <div className="medicines-empty">
              <Icon name="pill" size={38} />
              <h4>No Medicines Added Yet</h4>
              <p>Your medicines will appear here once added.</p>
            </div>
          ) : (
            <div className="medicine-list">
              {medicines.map(medicine => (
                <div className="medicine-item" key={medicine.id}>
                  <div className="medicine-item-icon">
                    <Icon name="pill" size={24} />
                  </div>

                  <div className="medicine-info">
                    <h4>{medicine.medicine_name}</h4>
                    <p>Dosage: {medicine.dosage}</p>
                    <p>Frequency: {medicine.frequency}</p>
                    <p>Time: {String(medicine.dose_time).slice(0, 5)}</p>
                  </div>

                  <div className="medicine-actions">
                    <button className="medicine-taken-btn" onClick={() => handleMarkTaken(medicine.id)}>
                      Mark as Taken ✓
                    </button>
                    <button className="medicine-delete-btn" onClick={() => handleDeleteMedicine(medicine.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Prescription Extraction */}
        <section className="medicines-card">
          <div className="medicines-section-title">
            <div className="medicines-icon">
              <Icon name="file" size={22} />
            </div>
            <div>
              <h3>Prescription Extraction</h3>
              <p>Upload a prescription to extract medicine details automatically.</p>
            </div>
          </div>

          <div className="prescription-upload">
            <Icon name="upload" size={30} />
            <p>Select your prescription (PDF or Image)</p>
            <input type="file" accept="image/*,.pdf" />
          </div>
        </section>

      </main>
    </div>
  )
}

// Sidebar Icons
function Icon({ name, size = 24 }) {
  const icons = {
    home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1z" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    doctor: <><path d="M6 3v5a4 4 0 0 0 8 0V3M10 12v2a5 5 0 0 0 10 0v-2" /><circle cx="20" cy="10" r="2" /><path d="M4 3h4" /></>,
    file: <><path d="M5 3h9l5 5v13H5z" /><path d="M14 3v5h5M8 13h8M8 17h8" /></>,
    pill: <><path d="m4 14 7-7a5 5 0 0 1 7 7l-7 7a5 5 0 0 1-7-7z" /><path d="m8 10 7 7" /></>,
    heart: <><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8z" /></>,
    emergency: <><path d="M12 3 2.5 20h19z" /><path d="M12 9v5M12 17h.01" /></>,
    upload: <><path d="M12 16V4M7 9l5-5 5 5M4 16v4h16v-4" /></>
  }

  return (
    <svg width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  )
}

export default Medicines
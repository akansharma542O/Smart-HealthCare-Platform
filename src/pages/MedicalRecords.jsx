import '../App.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function MedicalRecords() {
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  const [records, setRecords] = useState([])
  const [file, setFile] = useState(null)

  // Fetch medical records
  const fetchRecords = async () => {
    if (!user.id) return

    try {
      const response = await fetch(`http://localhost:5000/records/${user.id}`)
      const data = await response.json()
      setRecords(data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchRecords()
  }, [user.id])

  // Upload medical record
  const handleUpload = async () => {
    if (!file) return alert('Please select a file')

    const formData = new FormData()
    formData.append('file', file)
    formData.append('user_id', user.id)

    try {
      const response = await fetch('http://localhost:5000/records', {
        method: 'POST',
        body: formData
      })

      const data = await response.json()
      alert(data.message)

      if (response.ok) {
        setFile(null)
        document.getElementById('record-file').value = ''
        fetchRecords()
      }
    } catch (err) {
      alert('Something went wrong while uploading.')
    }
  }

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
          <Link to="/records" className="active"><Icon name="file" />Medical Records</Link>
          <Link to="/medicines"><Icon name="pill" />Medicines</Link>
          <Link to="/emergency"><Icon name="emergency" />Emergency</Link>
        </nav>

        <div className="sidebar-footer">
          <Icon name="heart" size={34} />
          <p>Better Care.<br />A Healthier You.</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main records-main">

        <div className="records-heading">
          <div>
            <span className="records-label">HEALTH DOCUMENTS</span>
            <h1>Medical Records</h1>
            <p>Store and manage your medical reports and health documents.</p>
          </div>
          <div className="records-heading-icon">
            <Icon name="file" size={30} />
          </div>
        </div>

        {/* Upload Section */}
        <section className="records-card">
          <div className="records-section-title">
            <div className="records-icon">
              <Icon name="upload" size={22} />
            </div>
            <div>
              <h3>Upload Medical Records</h3>
              <p>Keep all your health documents in one place.</p>
            </div>
          </div>

          <div className="records-upload-area">
            <div className="upload-file-icon">
              <Icon name="file" size={32} />
            </div>

            <h4>Select Your Document</h4>
            <p>Upload prescriptions, test reports and other medical documents.</p>

            <input
              type="file"
              id="record-file"
              onChange={(e) => setFile(e.target.files[0])}
            />

            <label htmlFor="record-file" className="choose-file-btn">
              Choose File
            </label>

            <p className="selected-file">
              {file ? file.name : 'No file selected'}
            </p>

            <button className="records-upload-btn" onClick={handleUpload}>
              <Icon name="upload" size={18} />
              Upload Record
            </button>
          </div>
        </section>

        {/* Records List */}
        <section className="records-card">
          <div className="records-section-title">
            <div className="records-icon">
              <Icon name="file" size={22} />
            </div>
            <div>
              <h3>My Records</h3>
              <p>Your uploaded medical documents.</p>
            </div>
            <span className="records-count">{records.length} Records</span>
          </div>

          {records.length === 0 ? (
            <div className="records-empty">
              <Icon name="file" size={38} />
              <h4>No Medical Records Yet</h4>
              <p>Your uploaded documents will appear here.</p>
            </div>
          ) : (
            <div className="records-list">
              {records.map(record => (
                <div className="record-item" key={record.id}>
                  <div className="record-file-icon">
                    <Icon name="file" size={24} />
                  </div>

                  <div className="record-info">
                    <h4>{record.record_name}</h4>
                    <p>Uploaded: {String(record.upload_date).slice(0, 10)}</p>
                  </div>

                  <a
                    href={`http://localhost:5000/uploads/${record.file_path}`}
                    target="_blank"
                    rel="noreferrer"
                    className="record-view-btn"
                  >
                    View / Download
                  </a>
                </div>
              ))}
            </div>
          )}
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

export default MedicalRecords
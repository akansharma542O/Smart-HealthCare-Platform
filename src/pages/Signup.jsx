import '../App.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function Signup() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSignup = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        alert('Account created successfully!')
        navigate('/login')
      } else {
        alert(data.message)
      }

    } catch (error) {
      alert('Unable to connect to server.')
    }
  }

  return (
    <div className="auth-container">

      <div className="auth-box">

        <h1>Create Account</h1>
        <p>Register to manage your healthcare journey.</p>

        <form onSubmit={handleSignup}>
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            pattern="[0-9]{10}"
            maxLength="10"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            minLength="8"
            required
          />

          <button type="submit">Create Account</button>
        </form>

        <p className="auth-switch">
          Already have an account? <a href="/login">Login</a>
        </p>

      </div>

    </div>
  )
}

export default Signup
import '../App.css'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'

function Login() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      console.log("LOGIN STATUS:", response.status);
      console.log("LOGIN DATA:", data);

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user))
        alert('Login successful!')
        navigate('/dashboard')
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

        <h1>Welcome Back!</h1>
        <p>Login to access your healthcare dashboard.</p>

        <form onSubmit={handleLogin}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          <div style={{ textAlign: 'right', marginBottom: '15px' }}>
           <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <button type="submit">Login</button>
        </form>

        <p className="auth-switch">
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>

      </div>

    </div>
  )
}

export default Login
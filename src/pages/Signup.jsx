import '../App.css'
import { useNavigate } from 'react-router-dom'
function Signup() {
  const navigate = useNavigate()
  const handleSignup = (e) => {
  e.preventDefault()
  navigate('/dashboard')
  }
  return (
    <div className="auth-container">

      <div className="auth-box">

        <h1>Create Account</h1>
        <p>Register to manage your healthcare journey.</p>

        <form onSubmit={handleSignup}>
          <label>Full Name</label>
          <input type="text" placeholder="Enter your full name" required />

          <label>Email Address</label>
          <input type="email" placeholder="Enter your email" required />

          <label>Phone Number</label>
          <input type="tel" placeholder="Enter your phone number" pattern="[0-9]{10}" maxLength="10" required/>

          <label>Password</label>
          <input type="password" placeholder="Create a password" required />

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
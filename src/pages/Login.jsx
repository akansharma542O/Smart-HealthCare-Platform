import '../App.css'
import { useNavigate } from 'react-router-dom'
function Login() {
  const navigate = useNavigate()
  const handleLogin = (e) => {
  e.preventDefault()
  navigate('/dashboard')
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
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            required
          />

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
import '../App.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function ForgotPassword() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [otpSent, setOtpSent] = useState(false)

  const sendOTP = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:5000/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await response.json()
      alert(data.message)

      if (response.ok) setOtpSent(true)

    } catch (error) {
      alert('Unable to connect to server.')
    }
  }

  const resetPassword = async (e) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      return alert('Passwords do not match!')
    }

    try {
      const response = await fetch('http://localhost:5000/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, newPassword })
      })

      const data = await response.json()
      alert(data.message)

      if (response.ok) navigate('/login')

    } catch (error) {
      alert('Unable to connect to server.')
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1>Forgot Password?</h1>
        <p>Reset your password using email OTP.</p>

        {!otpSent ? (
          <form onSubmit={sendOTP}>
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Send OTP</button>
          </form>
        ) : (
          <form onSubmit={resetPassword}>
            <label>Enter OTP</label>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="6-digit OTP"
              maxLength="6"
              required
            />

            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />

            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button type="submit">Reset Password</button>
          </form>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword
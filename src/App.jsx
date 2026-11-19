import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Doctors from './pages/Doctors'
import Appointments from './pages/Appointments'
import MedicalRecords from './pages/MedicalRecords'
import Medicines from './pages/Medicines'
import Emergency from './pages/Emergency'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'

// Protect pages that require login
function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  return user ? children : <Navigate to="/login" replace />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/doctors" element={<ProtectedRoute><Doctors /></ProtectedRoute>} />
        <Route path="/appointments" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
        <Route path="/records" element={<ProtectedRoute><MedicalRecords /></ProtectedRoute>} />
        <Route path="/medicines" element={<ProtectedRoute><Medicines /></ProtectedRoute>} />
        <Route path="/emergency" element={<ProtectedRoute><Emergency /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
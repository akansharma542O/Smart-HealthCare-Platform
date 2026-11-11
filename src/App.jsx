import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctors" element={<h1>Find Doctors</h1>} />
        <Route path="/appointments" element={<h1>Appointments</h1>} />
        <Route path="/records" element={<h1>Medical Records</h1>} />
        <Route path="/medicines" element={<h1>Medicine Tracker</h1>} />
        <Route path="/emergency" element={<h1>Emergency Services</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
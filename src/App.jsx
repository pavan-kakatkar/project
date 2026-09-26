import { useState } from 'react'
import Dashboard from './components/Dashboard.jsx'
import Login from './components/Login.jsx'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return isLoggedIn
    ? <Dashboard onLogout={() => setIsLoggedIn(false)} />
    : <Login onLoginSuccess={() => setIsLoggedIn(true)} />
}

export default App

import { useState } from 'react'
import Dashboard from './components/dashboard/index.jsx'
import Login from './components/login/index.jsx'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return isLoggedIn
    ? <Dashboard onLogout={() => setIsLoggedIn(false)} />
    : <Login onLoginSuccess={() => setIsLoggedIn(true)} />
}

export default App

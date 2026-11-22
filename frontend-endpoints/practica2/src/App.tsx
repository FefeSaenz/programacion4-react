import { useEffect, useState } from 'react'
import './App.css'
import Login from './Login'
import UserList from './UserList'

const API_URL = import.meta.env.VITE_API_URL

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [name, setName] = useState('')

  // Cuando hay token: pedir mi id y después mis datos
  useEffect(() => {
    if (!token) return

    async function cargarUsuario() {
      try {
        const headers = { Authorization: `Bearer ${token}` }

        const resId = await fetch(`${API_URL}/user/me/id`, { headers })
        const { id } = await resId.json()

        const resUser = await fetch(`${API_URL}/user/${id}`, { headers })
        const user = await resUser.json()
        setName(user.name)
      } catch {
        setName('')
      }
    }

    cargarUsuario()
  }, [token])

  function handleLogout() {
    localStorage.removeItem('token')
    setToken(null)
    setName('')
  }

  if (!token) {
    return <Login onLogin={setToken} />
  }

  return (
    <div className="app">
      <header>
        <h1>Hola, {name}</h1>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </header>
      <UserList token={token} />
    </div>
  )
}

export default App

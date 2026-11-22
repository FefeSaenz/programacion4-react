import { useEffect, useState } from 'react'
import './App.css'
import Login from './Login'
import UserList from './UserList'

const API_URL = import.meta.env.VITE_API_URL

interface User {
  id: number
  name: string
  roles: { id: number; name: string }[]
}

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState<User | null>(null)

  // Cuando hay token: pedir mi id y después mis datos (nombre y roles)
  useEffect(() => {
    if (!token) return

    async function cargarUsuario() {
      try {
        const headers = { Authorization: `Bearer ${token}` }

        const resId = await fetch(`${API_URL}/user/me/id`, { headers })
        const { id } = await resId.json()

        const resUser = await fetch(`${API_URL}/user/${id}`, { headers })
        setUser(await resUser.json())
      } catch {
        setUser(null)
      }
    }

    cargarUsuario()
  }, [token])

  function handleLogout() {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  if (!token) {
    return <Login onLogin={setToken} />
  }

  return (
    <div className="app">
      <header>
        <h1>
          {user
            ? `Hola, ${user.name} (${user.roles.map((r) => r.name).join(', ')})`
            : 'Hola'}
        </h1>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </header>
      <UserList token={token} />
    </div>
  )
}

export default App

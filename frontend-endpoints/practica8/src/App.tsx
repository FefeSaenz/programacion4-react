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
  const [message, setMessage] = useState('')

  // Si cualquier pedido da 401: borrar el token y volver al login
  function handleUnauthorized() {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    setMessage('Tu sesión venció')
  }

  // Cuando hay token: pedir mi id y después mis datos (nombre y roles)
  useEffect(() => {
    if (!token) return

    async function cargarUsuario() {
      try {
        const headers = { Authorization: `Bearer ${token}` }

        const resId = await fetch(`${API_URL}/user/me/id`, { headers })
        if (resId.status === 401) {
          handleUnauthorized()
          return
        }
        const { id } = await resId.json()

        const resUser = await fetch(`${API_URL}/user/${id}`, { headers })
        if (resUser.status === 401) {
          handleUnauthorized()
          return
        }
        setUser(await resUser.json())
      } catch {
        setUser(null)
      }
    }

    cargarUsuario()
  }, [token])

  function handleLogin(newToken: string) {
    setMessage('')
    setToken(newToken)
  }

  function handleLogout() {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    setMessage('')
  }

  if (!token) {
    return <Login onLogin={handleLogin} message={message} />
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
      <UserList token={token} onUnauthorized={handleUnauthorized} />
    </div>
  )
}

export default App

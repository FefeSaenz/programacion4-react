import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL

interface LoginProps {
  onLogin: (token: string) => void
  message?: string
}

function Login({ onLogin, message }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        setError('Email o contraseña incorrectos')
        return
      }

      const data = await res.json()
      localStorage.setItem('token', data.token)
      onLogin(data.token)
    } catch {
      setError('No se pudo conectar con el servidor')
    }
  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>
      {message && <p className="error">{message}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Entrar</button>
      {error && <p className="error">{error}</p>}
    </form>
  )
}

export default Login

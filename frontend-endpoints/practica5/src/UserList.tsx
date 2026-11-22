import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL

interface UserListItem {
  id: number
  name: string
}

interface UserDetail extends UserListItem {
  age: number
  email: string
  country: { id: number; name: string } | null
  roles: { id: number; name: string }[]
}

interface UserListProps {
  token: string
}

// Saca el mensaje de error de la respuesta (puede ser string, array o texto plano)
async function getErrorMessage(res: Response): Promise<string> {
  const text = await res.text()
  try {
    const data = JSON.parse(text)
    if (typeof data.detail === 'string') return data.detail
    if (Array.isArray(data.detail)) {
      return data.detail.map((d: { msg: string }) => d.msg).join(', ')
    }
  } catch {
    // no era JSON (por ejemplo un 500 en texto plano)
  }
  return text || `Error ${res.status}`
}

function UserList({ token }: UserListProps) {
  const [users, setUsers] = useState<UserListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null)

  // Campos del formulario de alta
  const [newName, setNewName] = useState('')
  const [newAge, setNewAge] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newCountryId, setNewCountryId] = useState('1')
  const [createError, setCreateError] = useState('')

  // Pide una lista de usuarios a la url que le pasemos (lista completa o búsqueda)
  async function pedirUsuarios(url: string) {
    setLoading(true)
    setError('')

    try {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) {
        setError(await getErrorMessage(res))
        return
      }

      const data = await res.json()
      // /user/search devuelve más campos, nos quedamos solo con id y name
      setUsers(data.map(({ id, name }: UserListItem) => ({ id, name })))
    } catch {
      setError('No se pudo conectar con el servidor')
    } finally {
      setLoading(false)
    }
  }

  // Traer la lista de usuarios
  useEffect(() => {
    pedirUsuarios(`${API_URL}/user`)
  }, [token])

  // Cada vez que cambia el id seleccionado, pedir el detalle
  useEffect(() => {
    if (selectedId === null) return

    fetch(`${API_URL}/user/${selectedId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setSelectedUser(data))
  }, [selectedId, token])

  function handleSearch(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()

    if (search.trim() === '') {
      pedirUsuarios(`${API_URL}/user`)
    } else {
      pedirUsuarios(`${API_URL}/user/search/${encodeURIComponent(search)}`)
    }
  }

  function handleClear() {
    setSearch('')
    pedirUsuarios(`${API_URL}/user`)
  }

  async function handleCreate(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    setCreateError('')

    try {
      const res = await fetch(`${API_URL}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newName,
          age: Number(newAge),
          email: newEmail,
          password: newPassword,
          country_id: Number(newCountryId),
        }),
      })

      if (!res.ok) {
        setCreateError(await getErrorMessage(res))
        return
      }

      // El backend solo devuelve { id }, armamos el item con lo que mandamos
      const data = await res.json()
      setUsers([...users, { id: data.id, name: newName }])

      setNewName('')
      setNewAge('')
      setNewEmail('')
      setNewPassword('')
      setNewCountryId('1')
    } catch {
      setCreateError('No se pudo crear el usuario (error de red o del servidor)')
    }
  }

  return (
    <div>
      <form className="create-form" onSubmit={handleCreate}>
        <h2>Nuevo usuario</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Edad"
          value={newAge}
          onChange={(e) => setNewAge(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña (mínimo 4 caracteres)"
          minLength={4}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <select
          value={newCountryId}
          onChange={(e) => setNewCountryId(e.target.value)}
        >
          <option value="1">Argentina</option>
          <option value="2">Brasil</option>
        </select>
        <button type="submit">Crear usuario</button>
        {createError && <p className="error">{createError}</p>}
      </form>

      <div className="user-list">
        <div>
          <h2>Usuarios</h2>

          <form className="search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Buscar por nombre"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">Buscar</button>
            <button type="button" className="secondary" onClick={handleClear}>
              Limpiar
            </button>
          </form>

          {loading && <p>Cargando...</p>}
          {error && <p className="error">{error}</p>}

          {!loading && !error && users.length === 0 && (
            <p>No se encontraron usuarios</p>
          )}

          {!loading && !error && (
            <ul>
              {users.map((user) => (
                <li
                  key={user.id}
                  className={user.id === selectedId ? 'selected' : ''}
                  onClick={() => setSelectedId(user.id)}
                >
                  {user.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {selectedUser && (
          <div className="detail">
            <h2>{selectedUser.name}</h2>
            <p>Email: {selectedUser.email}</p>
            <p>Edad: {selectedUser.age}</p>
            <p>País: {selectedUser.country?.name ?? 'Sin país'}</p>
            <p>Roles: {selectedUser.roles.map((r) => r.name).join(', ')}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserList

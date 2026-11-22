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
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null)

  // Traer la lista de usuarios
  useEffect(() => {
    async function cargarUsuarios() {
      setLoading(true)
      setError('')

      try {
        const res = await fetch(`${API_URL}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) {
          setError(await getErrorMessage(res))
          return
        }

        setUsers(await res.json())
      } catch {
        setError('No se pudo conectar con el servidor')
      } finally {
        setLoading(false)
      }
    }

    cargarUsuarios()
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

  return (
    <div className="user-list">
      <div>
        <h2>Usuarios</h2>

        {loading && <p>Cargando...</p>}
        {error && <p className="error">{error}</p>}

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
  )
}

export default UserList

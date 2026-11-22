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

function UserList({ token }: UserListProps) {
  const [users, setUsers] = useState<UserListItem[]>([])
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [selectedUser, setSelectedUser] = useState<UserDetail | null>(null)

  // Traer la lista de usuarios
  useEffect(() => {
    fetch(`${API_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
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

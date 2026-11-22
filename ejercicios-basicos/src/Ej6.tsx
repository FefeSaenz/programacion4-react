import { useState } from 'react'

function Ej6() {
  const [search, setSearch] = useState<string>('');
  const languages = ['JavaScript', 'TypeScript', 'Java', 'C#', 'Python', 'Cobol', 'Fortran', 'Ruby', 'Rust', 'Go'];

  const busqueda = languages.filter((e) =>
    e.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='ej6-card'>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <p>{busqueda.length} lenguajes encontrados.</p>

      <ul className="ej6-list">
        {busqueda.length === 0 ? (
          <li className="ej6-list-item">No se encontraron resultados.</li>
        ) : (
          busqueda.map((item) =>
            <li className="ej6-list-item" key={item}>
              {item}
            </li>
          )
        )}
      </ul>
    </div>
  )
}

export default Ej6

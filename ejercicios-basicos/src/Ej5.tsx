import { useState } from 'react'

interface itemsProps {
  id: number;
  text: string;
}

function Ej5() {
  const [data, setData] = useState<string>('');
  const [items, setItems] = useState<itemsProps[]>( [] );

  return (
    <div className='ej5-card'>
      <div className='ej5-input-group'>
        <input
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />
        <button
          onClick={() => {
            if (data != '') {
              setItems([...items, { id:Date.now(), text: data }]);
              setData('');
          }}}
        >Agregar</button>
      </div>

      <ul className='ej5-list'>
        {items.length === 0 ? (
          <li className='ej5-item'><p>No hay nada que comprar</p></li>
        ) : (
          items.map((item) =>
            <li className='ej5-item' key={item.id}>
              {item.text}

              <button
                onClick={() => setItems(items.filter((i) => i.id !== item.id))}
              >Eliminar</button>
            </li>
        ))}
      </ul>
    </div>
  )
}

export default Ej5

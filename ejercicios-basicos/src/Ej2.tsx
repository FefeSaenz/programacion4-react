import { useState } from 'react'

function Ej2() {
  const [count, setCount] = useState<number>(0);

  return (
    <div className="ej2-card">
      <h3>{count}</h3>

      <div className="ej2-buttons">
        <button
          onClick={() => {if (count > 0) setCount(count - 1)}}
          disabled={count === 0}
        >-</button>
        <button
          onClick={() => {if (count < 10) setCount(count + 1)}}
          disabled={count === 10}
        >+</button>
        <button
          onClick={() => setCount(0)}
        >Reiniciar</button>
      </div>

      {count === 10 &&
        <p>Llegaste al máximo</p>
      }
    </div>
  )
}

export default Ej2

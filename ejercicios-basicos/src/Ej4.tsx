import { useState } from 'react'

function Ej4() {
  const [temperature, setTemperature] = useState<string>('');
  const farenheit = Number(temperature) * 9/5 + 32;

  return (
    <div className='ej4-card'>
      <input
        type="text"
        value={temperature}
        onChange={(e) => {setTemperature(e.target.value)}}
      />

      <h2>{farenheit} °F</h2>

      {Number(temperature) > 30 &&
        <p>Hace calor</p>
      }
    </div>
  )
}

export default Ej4

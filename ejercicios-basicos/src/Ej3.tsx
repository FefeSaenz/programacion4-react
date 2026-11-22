import { useState } from 'react'

function Ej3() {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className="ej3-question">
      <h3>¿Qué es JSX?</h3>
      <button onClick={() => {setVisible(!visible)}}>
        {visible ? "Ocultar Respuesta" : "Mostrar Respuesta"}
      </button>
      {visible &&
        <p>Una sintaxis que permite una estructura parecida a HTML dentro de JS. Se transforma en llamadas a funciones de React.</p>
      }
    </div>
  )
}

export default Ej3

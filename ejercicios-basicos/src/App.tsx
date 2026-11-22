import Ej1 from './Ej1.tsx'
import Ej2 from './Ej2.tsx'
import Ej3 from './Ej3.tsx'
import Ej4 from './Ej4.tsx'
import Ej5 from './Ej5.tsx'
import Ej6 from './Ej6.tsx'
import Ej7 from './Ej7.tsx'
import './App.css'

function App() {
  return (
    <main className='app'>
      <h1>Ejercicios básicos de React</h1>

      <section className='app-section'>
        <h2>Ejercicio 1: Tarjetas de producto</h2>
        <Ej1 />
      </section>

      <section className='app-section'>
        <h2>Ejercicio 2: Contador con límites</h2>
        <Ej2 />
      </section>

      <section className='app-section'>
        <h2>Ejercicio 3: Mostrar / ocultar respuesta</h2>
        <Ej3 />
      </section>

      <section className='app-section'>
        <h2>Ejercicio 4: Conversor de Celsius a Fahrenheit</h2>
        <Ej4 />
      </section>

      <section className='app-section'>
        <h2>Ejercicio 5: Lista de compras</h2>
        <Ej5 />
      </section>

      <section className='app-section'>
        <h2>Ejercicio 6: Buscador de lenguajes</h2>
        <Ej6 />
      </section>

      <section className='app-section'>
        <h2>Ejercicio 7: Producto tipado con oferta</h2>
        <Ej7 />
      </section>
    </main>
  )
}

export default App

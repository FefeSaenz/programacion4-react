function Producto({ nombre, precio, stock }: { nombre: string; precio: number; stock: number }) {
  return (
    <div className='ej1-card'>
      <h3>{nombre}</h3>
      <p>{`$ ${precio}`}</p>
      <p>{stock === 0 ? "Sin stock" : `Stock: ${stock} unidades`}</p>
    </div>
  );
}

function Ej1() {
  return (
    <div className='ej1-grid'>
      <Producto nombre="Televisor" precio={150000} stock={2} />
      <Producto nombre="Videocasetera" precio={15000} stock={5} />
      <Producto nombre="Walkman" precio={2000} stock={0} />
    </div>
  )
}

export default Ej1

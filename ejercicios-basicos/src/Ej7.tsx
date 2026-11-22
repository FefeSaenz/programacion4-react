interface ProductoProps {
  nombre: string;
  precio: number;
  stock: number;
  oferta?: boolean;
}

function Producto({ nombre, precio, stock, oferta }: ProductoProps) {
  return (
    <div className='ej7-card'>
      <h3>{nombre}</h3>
      <p>{`$ ${precio}`}</p>
      {oferta &&
        <p className='ej7-oferta'>¡Oferta!</p>
      }
      <p>{stock === 0 ? "Sin stock" : `Stock: ${stock} unidades`}</p>
    </div>
  );
}

function Ej7() {
  return (
    <div className='ej7-grid'>
      <Producto nombre="Televisor" precio={150000} stock={2} />
      <Producto nombre="Videocasetera" precio={15000} stock={5} oferta={true} />
      <Producto nombre="Walkman" precio={2000} stock={0} />
    </div>
  )
}

export default Ej7

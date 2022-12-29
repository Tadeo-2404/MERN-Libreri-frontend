import {Link} from 'react-router-dom'
const Error404 = () => {
  return (
    <>
      <div className='p-2 h-screen flex flex-col justify-center items-center'>
        <div className='text-center font-semibold text-2xl'>
          <h1 className='text-9xl text-gray-300'>404</h1>
          <h2 className='text-3xl'>Lo sentimos, pagina no encontrada.</h2>
          <p className='text-2xl font-normal'>La pagina que estas buscando ha sido removida, cambio su nombre o no esta disponible temporalmente.</p>
        </div>
          <Link to="/" preventScrollReset={true}  className="uppercase 
        bg-blue-500 
        text-white 
        p-3 
        mt-10 
        w-full
        hover:transform 
        hover:-translate-y-2 
        hover:bg-gradient-to-r 
        from-blue-500
        to-blue-300
        text-center">
            volver a la pagina principal
          </Link>
      </div>
    </>
  );
}

export default Error404
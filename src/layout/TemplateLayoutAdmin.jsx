import { useState, useEffect, useContext } from 'react'
import { Outlet, Navigate, Link } from 'react-router-dom'
import { Context } from '../context/ContextProvider';
import { RiLogoutBoxRLine, RiUserLine, RiBookLine } from "react-icons/ri";

const TemplateLayoutAdmin = () => {
    const [fecha, setFecha] = useState(0);
    const {auth, logOut} = useContext(Context);
    
    useEffect(() => {
      const updateDate = () => {
        setFecha(new Date().getFullYear())
      }
      updateDate();
    }, [])

  return (
    <>
      <div className="bg-blue-500 p-6 flex justify-between items-center w-full">
        <div>
          <Link to="/admin">
            <h1 className='uppercase font-bold text-4xl text-white'>
                libreria
            </h1>
          </Link>
        </div>
        <div>
          <nav className="flex justify-around w-full gap-x-8">
            <Link to="/admin">
               <button className="font-bold capitalize text-white text-xl flex justify-between items-center gap-x-2 hover:underline hover:transform hover:-translate-y-1">mis libros    <RiBookLine/></button>
            </Link>

            <Link to="/admin/perfil">
              <button className="font-bold capitalize text-white text-xl flex justify-between items-center gap-x-2 hover:underline hover:transform hover:-translate-y-1">mi perfil <RiUserLine/></button>
            </Link>
            <button className="font-bold capitalize text-white text-xl flex justify-between items-center gap-x-2 hover:underline hover:transform hover:-translate-y-1" onClick={logOut}>salir <RiLogoutBoxRLine/> </button>
          </nav>
        </div>
      </div>

      <div className="p-8 flex flex-col justify-center items-center">
        {auth._id == undefined ? <Navigate to="/" /> : <Outlet />}
      </div>
      <div className="bg-black p-4">
        <div>
          <h2 className="text-white text-center uppercase">
            todos los derechos reservados &copy; {fecha}
          </h2>
        </div>
      </div>
    </>
  );
}

export default TemplateLayoutAdmin
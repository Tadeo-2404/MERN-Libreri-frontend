import { Link } from 'react-router-dom'
const NavPerfil = () => {
  return (
    <>
     <nav className="flex justify-around items-center w-full capitalize font-semibold text-indigo-800 text-xl mb-12">
        <Link to="/admin/perfil" className='hover:underline'>
            mi perfil
        </Link>
        <Link to="/admin/cambiar-password" className="hover:underline">
           cambiar password
        </Link>
     </nav>
    </>
  )
}

export default NavPerfil
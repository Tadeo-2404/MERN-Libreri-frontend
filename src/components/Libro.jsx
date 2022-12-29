import { TiEdit } from "react-icons/ti";
import { RiDeleteBinLine } from 'react-icons/ri'
import LibrosContext from "../context/ContextProviderLibros";
import { useContext } from "react";

const Libro = ({libro}) => {
    const { ISBN ,titulo, autor, editorial, fecha} = libro
    const { editLibro, deleteLibro } = useContext(LibrosContext);
  return ( 
    <div className="p-4 text-lg bg-gray-200 shadow-lg flex flex-col justify-center items-start w-full relative">
        <div className="flex gap-3 absolute top-4 right-4">
            <div>
                <RiDeleteBinLine color="red" size="1.5rem" className="hover:scale-125" onClick={() => deleteLibro(libro)}/>
            </div>
            <div>
                <TiEdit size="1.5rem" className="hover:scale-125 text-blue-800" onClick={() => editLibro(libro)}/>
            </div>
        </div>
        <p><span className="text-blue-800 font-bold uppercase">isbn:</span> {ISBN}</p>
        <h1><span className="text-blue-800 font-bold capitalize">titulo:</span> {titulo}</h1>
        <p><span className="text-blue-800 font-bold capitalize">autor:</span> {autor}</p>
        <p><span className="text-blue-800 font-bold capitalize">editorial:</span> {editorial}</p>
        <p><span className="text-blue-800 font-bold capitalize">fecha:</span> {fecha}</p>
    </div>
  )
}

export default Libro
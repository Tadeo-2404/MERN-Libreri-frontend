import { useContext } from "react";
import LibrosContext from "../context/ContextProviderLibros";
import Libro from "./Libro";

const ListaLibros = () => {
  const { libros } = useContext(LibrosContext);
  
  return (
    <div>
      {libros.length ? (
        <div>
        <div className="flex flex-col justify-center items-center">
          <h1 className="uppercase text-center font-semibold sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl xl:mb-8 2xl:text-5xl">
            administra tus <span className="text-blue-800">libros</span>
          </h1>
          <p className="uppercase text-center sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl">
            para editar, selecciona un libro
          </p>
        </div>
        <div className="flex flex-col gap-y-10 p-4 overflow-y-auto">
        {libros.map((libro) => {
        return (
            <Libro key={libro._id} libro={libro}/>
        );
      })}
        </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h1 className="uppercase text-center font-semibold sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl xl:mb-8 2xl:text-5xl">
            no hay libros <span className="text-blue-800">disponibles</span>
          </h1>
          <p className="uppercase text-center sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl">
            puedes crear un libro en el formulario
          </p>
        </div>
      )}
    </div>
  );
};

export default ListaLibros;

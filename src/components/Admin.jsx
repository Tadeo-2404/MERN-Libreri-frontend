import { useState, useContext } from "react";
import { Context } from "../context/ContextProvider";
import FormularioLibros from "./FormularioLibros";
import ListaLibros from "./ListaLibros";

const Admin = () => {
  const { auth, loading } = useContext(Context);
  const [btn, setBtn] = useState(true);

  const showBtn = () => {
    setBtn(!btn);
  }

  return (
    <>
      <div className="flex flex-col justify-center p-4 w-full">
        <div className="flex flex-col justify-center items-center gap-y-3">
          <h1 className="font-bold text-5xl">
            Hola <span className="capitalize text-blue-800">{auth.nombre}</span>
          </h1>
          <h2 className="font-semibold text-xl">¿Que deseas hacer hoy?</h2>
          <div className="2xl:hidden">
            <button
              className="uppercase p-2 sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl 2xl:p-3 bg-blue-500 text-white mt-10 w-full hover:transform hover:-translate-y-2 hover:bg-gradient-to-r from-blue-500 to-blue-300 "
              onClick={showBtn} 
            >
              <p className="uppercase font-bold">agregar libro</p>
            </button>
          </div>
        </div>
        <div className="mt-10 gap-20 p-2 sm:flex sm:flex-col md:flex md:flex-col lg:flex lg:flex-col xl:grid xl:grid-cols-2 2xl:grid 2xl:grid-cols-2">
          {btn && (
            <div>
              <FormularioLibros />
            </div>
          )}
          <div>
            <ListaLibros />
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;

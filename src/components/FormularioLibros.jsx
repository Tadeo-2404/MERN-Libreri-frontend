import { useState, useContext, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import LibrosContext from "../context/ContextProviderLibros";

const FormularioLibros = () => {
  const {libros, libro, storeLibros} = useContext(LibrosContext);
  const [id, setID] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [editorial, setEditorial] = useState("");
  const [fecha, setFecha] = useState("");

  //VALIDACIONES
  const [error, setError] = useState([]);
  const [exito, setExito] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if(libro?._id) {
      setID(libro._id);
    }

    if(libro?.titulo) {
      setTitulo(libro.titulo);
    }

    if(libro?.autor) {
      setAutor(libro.autor);
    }

    if(libro?.editorial) {
      setEditorial(libro.editorial);
    }

    if(libro?.fecha) {
      setFecha(libro.fecha);
    }
  }, [libro])
  

  const resetForm = () => {
    setID(null);
    setTitulo("");
    setAutor("");
    setEditorial("");
    setFecha("");
  };

  const handdleSubmit = async (event) => {
    event.preventDefault();
    const regValidation = /^[A-Za-z0-9 ]+$/

    if (!titulo || !autor || !editorial || !fecha) {
      setError((error) => error.push("Todos los campos son obligatorios"));
      setTimeout(() => {
        setError([]);
      }, 2500);
      return;
    }

    if (!regValidation.test(titulo)) {
      setError((error) => [
        ...error,
        `"${titulo}" no es titulo valido`,
      ]);
      setTimeout(() => {
        setError([]);
      }, 2500);
      return;
    } 

    if (!regValidation.test(autor)) {
      setError((error) => [
        ...error,
        `"${autor}" no es un autor valido`,
      ]);
      setTimeout(() => {
        setError([]);
      }, 2500);
      return;
    } 

    if (!regValidation.test(editorial)) {
      setError((error) => [
        ...error,
        `"${editorial}" no es un editorial valido`,
      ]);
      setTimeout(() => {
        setError([]);
      }, 2500);
      return;
    } 

    storeLibros({titulo, autor, editorial, fecha, id})
    setExito((exito) => [...exito, "Libro agregado correctamente"]);
    setTimeout(() => {
      setExito([]);
      resetForm();
    }, 2500);
  }

  return (
    <>
      <form
        action="/admin"
        className="bg-gray-200 shadow-2xl w-full sm:p-8 md:p-8 lg:p-8 xl:p-8 2xl:p-12"
        onSubmit={handdleSubmit}
      >
        <legend className="uppercase font-bold text-center text-blue-500 sm:text-2xl sm:mb-8 md:text-3xl md:mb-8 lg:text-4xl lg:mb-8 xl:text-5xl xl:mb-8 2xl:text-5xl 2xl:mb-12">
          Agregar Libros
        </legend>
        <fieldset className="flex flex-col gap-8">
          <div className="flex flex-col gap-y-2">
            <label
              className="grow uppercase sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl"
              htmlFor="titulo"
            >
              titulo
            </label>
            <input
              className="border-none outline-none hover:shadow-lg w-full sm:text-sm sm:p-2 md:text-base md:p-2 lg:text-lg lg:p-2 xl:p-2 xl:text-xl 2xl:text-xl 2xl:p-4"
              type="text"
              placeholder="Titulo del Libro"
              required
              id="titulo"
              value={titulo}
              onChange={(event) => setTitulo(event.target.value)}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label
              className="grow uppercase sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl"
              htmlFor="autor"
            >
              autor
            </label>
            <input
              className="border-none outline-none hover:shadow-lg w-full sm:text-sm sm:p-2 md:text-base md:p-2 lg:text-lg lg:p-2 xl:p-2 xl:text-xl 2xl:text-xl 2xl:p-4"
              type="text"
              placeholder="Autor del Libro"
              required
              id="autor"
              value={autor}
              onChange={(event) => setAutor(event.target.value)}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label
              className="grow uppercase sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl"
              htmlFor="editorial"
            >
              editorial
            </label>
            <input
              className="border-none outline-none hover:shadow-lg w-full sm:text-sm sm:p-2 md:text-base md:p-2 lg:text-lg lg:p-2 xl:p-2 xl:text-xl 2xl:text-xl 2xl:p-4"
              type="text"
              placeholder="Editorial del Libro"
              required
              id="editorial"
              value={editorial}
              onChange={(event) => setEditorial(event.target.value)}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label
              className="grow uppercase sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl"
              htmlFor="fecha"
            >
              Fecha
            </label>
            <input
              className="border-none outline-none hover:shadow-lg w-full sm:text-sm sm:p-2 md:text-base md:p-2 lg:text-lg lg:p-2 xl:p-2 xl:text-xl 2xl:text-xl 2xl:p-4"
              type="date"
              placeholder="Fecha del Libro"
              required
              id="fecha"
              value={fecha}
              onChange={(event) => setFecha(event.target.value)}
            />
          </div>
        </fieldset>

                {load && (
          <div className="flex justify-center mt-10">
            <ClipLoader
              color="blue"
              loading="true"
              size={100}
              aria-label="Loading Spinner"
            />
          </div>
        )}

        <input
          type="submit"
          value={id ? "Actualizar Libro" : "Agregar Libro"}
          className="uppercase 
        bg-blue-500 
        text-white 
        p-3 
        mt-10 
        w-full
        hover:transform 
        hover:-translate-y-2 
        hover:bg-gradient-to-r 
        from-blue-500
        to-blue-300"
        />

          {error.length > 0 && (
          <div className="flex flex-col justify-center items-center w-full text-center">
            {error.map((e) => (
              <div
                className="bg-red-500 text-white font-bold uppercase p-2 mt-3 w-full sm:text-sm md:text-base lg:text-lg xl:text-xl xl:p-4 2xl:text-xl 2xl:p-4"
                key={e}
              >
                <p>{e}</p>
              </div>
            ))}
          </div>
        )}

        {exito.length > 0 && (
          <div className="flex flex-col justify-center items-center w-full text-center">
            {exito.map((e) => (
              <div
              className="bg-green-600 text-white font-bold uppercase p-2 mt-3 w-full sm:text-sm md:text-base lg:text-lg xl:text-xl xl:p-4 2xl:text-xl 2xl:p-4"
                key={e}
              >
                <p>{e}</p>
              </div>
            ))}
          </div>
        )}
      </form>
    </>
  );
};

export default FormularioLibros;

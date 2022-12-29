import NavPerfil from "./NavPerfil";
import { Context } from "../context/ContextProvider";
import { useContext, useEffect, useState } from "react";
const Perfil = () => {
  const { auth, updateProfile } = useContext(Context);
  const [perfil, setperfil] = useState({});
  const [error, setError] = useState([]);
  const [exito, setExito] = useState([]);

  useEffect(() => {
    setperfil(auth);
  }, [auth]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { nombre, apellido, telefono, correo } = perfil;
    const regName = /^[a-zA-Z ]{2,30}$/;
    const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!nombre || !correo) {
      setError((error) => error.push("Todos los campos son obligatorios"));
      setTimeout(() => {
        setError([]);
      }, 2500);
      return;
    }

    if (!regName.test(nombre)) {
      setError((error) => [
        ...error,
        `"${nombre}" no es nombre valido (gonzalo)`,
      ]);
      setTimeout(() => {
        setError([]);
      }, 2500);
      return;
    }

    if (!regEmail.test(correo)) {
      setError((error) => [
        ...error,
        `"${correo}" no es correo valido (correo@correo.com))`,
      ]);
      setTimeout(() => {
        setError([]);
      }, 2500);
      return;
    }

    const actualizado = await updateProfile(perfil);
    setExito((exito) => [...exito, actualizado.msg]);
    setTimeout(() => {
      setExito([]);
    }, 2500);
  };

  return (
    <>
      <NavPerfil />
      <div>
        <div>
          <form
            action="/admin/perfil"
            className="bg-gray-200 shadow-2xl w-full sm:p-8 md:p-8 lg:p-8 xl:p-8 2xl:p-12"
            onSubmit={handleSubmit}
          >
            <legend className="uppercase font-bold text-center text-blue-500 sm:text-2xl sm:mb-8 md:text-3xl md:mb-8 lg:text-4xl lg:mb-8 xl:text-5xl xl:mb-8 2xl:text-5xl 2xl:mb-12">
              editar perfil
            </legend>
            <fieldset className="flex flex-col gap-8">
              <div className="flex flex-col gap-y-2">
                <label
                  className="grow uppercase sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl"
                  htmlFor="nombre"
                >
                  nombre
                </label>
                <input
                  className="bg-gray-300 border-none outline-none hover:shadow-lg w-full sm:text-sm sm:p-2 md:text-base md:p-2 lg:text-lg lg:p-2 xl:p-2 xl:text-xl 2xl:text-xl 2xl:p-4"
                  type="text"
                  placeholder="nombre"
                  required
                  id="nombre"
                  name="nombre"
                  value={perfil.nombre || ""}
                  onChange={(e) =>
                    setperfil({
                      ...perfil,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex flex-col gap-y-2">
                <label
                  className="grow uppercase sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl"
                  htmlFor="apellido"
                >
                  apellido
                </label>
                <input
                  className="bg-gray-300 border-none outline-none hover:shadow-lg w-full sm:text-sm sm:p-2 md:text-base md:p-2 lg:text-lg lg:p-2 xl:p-2 xl:text-xl 2xl:text-xl 2xl:p-4"
                  type="text"
                  placeholder="apellido"
                  required
                  id="apellido"
                  name="apellido"
                  value={perfil.apellido || ""}
                  onChange={(e) =>
                    setperfil({
                      ...perfil,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex flex-col gap-y-2">
                <label
                  className="grow uppercase sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl"
                  htmlFor="correo"
                >
                  correo
                </label>
                <input
                  className="bg-gray-300 border-none outline-none hover:shadow-lg w-full sm:text-sm sm:p-2 md:text-base md:p-2 lg:text-lg lg:p-2 xl:p-2 xl:text-xl 2xl:text-xl 2xl:p-4"
                  type="text"
                  placeholder="correo"
                  required
                  id="correo"
                  name="correo"
                  value={perfil.correo || ""}
                  onChange={(e) =>
                    setperfil({
                      ...perfil,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex flex-col gap-y-2">
                <label
                  className="grow uppercase sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl"
                  htmlFor="telefono"
                >
                  telefono
                </label>
                <input
                  className="bg-gray-300 border-none outline-none hover:shadow-lg w-full sm:text-sm sm:p-2 md:text-base md:p-2 lg:text-lg lg:p-2 xl:p-2 xl:text-xl 2xl:text-xl 2xl:p-4"
                  type="text"
                  placeholder="telefono"
                  required
                  id="telefono"
                  name="telefono"
                  value={perfil.telefono || ""}
                  onChange={(e) =>
                    setperfil({
                      ...perfil,
                      [e.target.name]: e.target.value,
                    })
                  }
                />
              </div>
            </fieldset>

            <input
              type="submit"
              value="guardar cambios"
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
              <div className="flex flex-col justify-center items-center w-full">
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
              <div className="flex flex-col justify-center items-center w-full">
                <div className="bg-green-600 text-white font-bold uppercase p-2 mt-3 w-full sm:text-sm md:text-base lg:text-lg xl:text-xl xl:p-4 2xl:text-xl 2xl:p-4">
                  <p>{exito}</p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Perfil;

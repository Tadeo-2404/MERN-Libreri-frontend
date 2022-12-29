import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

//el usuario coloca su correo y se le envia un email
const olvidePassword = () => {
  const [correo, setCorreo] = useState("");
  const [error, setError] = useState([]);
  const [exito, setExito] = useState([]);
  const [load, setLoad] = useState(false);
  const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  const resetForm = () => {
    setCorreo("");
  }

  const handdleSubmit = async (event) => {
    setError([]);
    event.preventDefault();

    if (!correo) {
      setError((error) => [...error, "Todos los campos son obligatorios"]);
      setTimeout(() => {
        setError([]);
      }, 2500);
      return;
    }

    if(!regEmail.test(correo)) {
      setError((error) => [...error, `"${correo}" no es un correo valido`]);
      setTimeout(() => {
        setError([]);
      }, 2500);
      return;
    }

    try {
      setLoad(true);
      const url = `${import.meta.env.VITE_URL_BACKEND}/api/clientes/olvide-password`;
      const response = await axios.post(url, {correo});
      setLoad(false);
      setExito(exito => [...exito, response.data.msg]);
      setTimeout(() => {
        setExito([]);
        resetForm();
      }, 2500);
    } catch (e) {
      console.log(e)
      setError(error => [...error, e.response.data.msg]);
      setTimeout(() => {
        setError([]);
      }, 2500);
      setLoad(false);
    }
  };

  return (
    <div>
      <form
        action="/olvide-password"
        className="bg-gray-200 shadow-2xl w-full sm:p-8 md:p-8 lg:p-8 xl:p-8 2xl:p-12"
        onSubmit={handdleSubmit}
      >
        <legend className="uppercase font-bold text-center text-blue-500 sm:text-2xl sm:mb-8 md:text-3xl md:mb-8 lg:text-4xl lg:mb-8 xl:text-5xl xl:mb-8 2xl:text-5xl 2xl:mb-12">
          restablecer contraseña
        </legend>
        <fieldset className="flex flex-col gap-8">
          <div className="flex flex-col gap-y-2">
            <label className="grow uppercase sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl" htmlFor="correo">
              correo
            </label>
            <input
            className="border-none outline-none hover:shadow-lg w-full sm:text-sm sm:p-2 md:text-base md:p-2 lg:text-lg lg:p-2 xl:p-2 xl:text-xl 2xl:text-xl 2xl:p-4" 
              type="email"
              placeholder="Introduce tu correo"
              required
              autoComplete="on"
              id="correo"
              onChange={(event) => setCorreo(event.target.value)}
              value={correo}
            />
          </div>
        </fieldset>

        {load &&
        <div className='flex justify-center mt-10'>
        <ClipLoader
           color="blue"
           loading="true"
           size={100}
           aria-label="Loading Spinner"
         />
       </div>
        }

        <input
          type="submit"
          value="restablecer contraseña"
          className="uppercase
          p-2
          sm:text-sm
          md:text-base
          lg:text-lg
          xl:text-xl
          2xl:text-xl
          2xl:p-3
          bg-blue-500 
          text-white 
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

        <div className="text-center mt-6 capitalize underline w-full grid grid-row-2 sm:gap-y-6 sm:text-sm md:gap-y-6 md:text-base lg:gap-y-8 lg:text-lg xl:text-xl xl:gap-y-6 2xl:text-xl 2xl:gap-y-8">
          <div className="hover:text-gray-400">
            <Link to="/registrarse" preventScrollReset={true}>
              ¿no tienes una cuenta? crea una
            </Link>
          </div>
          <div className="hover:text-gray-400">
            <Link to="/" preventScrollReset={true}>
              ¿ya tienes una cuenta? inicia sesion
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default olvidePassword;

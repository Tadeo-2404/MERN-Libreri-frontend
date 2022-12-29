import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

//una vex que el usuario recibe su correo, se verifica el nuevo token generado, si es correcto se pide que coloque su nueva contraseña
const nuevoPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [error, setError] = useState([]);
  const [exito, setExito] = useState([]);
  const [load, setLoad] = useState(false);
  const regSpaces = /^(?=.*\s)/;
  const regLower = /^(?=.*[a-z])/;
  const regUpper = /^(?=.*[A-Z]).*$/;
  const regNumber = /^(?=.*[0-9])/;
  const regSpecial = /^(?=.*[~`!@#$%^&*()--+={}[]|\:;"'<>,.?_])/;
  const regLength = /^.{10,16}$/;

  const resetForm = () => {
    setPassword("");
    setRepetirPassword("");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${import.meta.env.VITE_URL_BACKEND}/api/clientes/olvide-password/${token}`;
        const response = await axios.get(url);
        setExito(response.data.msg);
      } catch (e) {
        setError(e.response.data.msg);
      }
    };
    fetchData();
  }, []);

  const handdleSubmit = async (event) => {
    setError([]);
    event.preventDefault();

    if (!password || !repetirPassword) {
      setError((error) => error.push("Todos los campos son obligatorios"));
      setTimeout(() => {
        setError([]);
      }, 2500);
      return;
    }

    if (regSpaces.test(password)) {
      setError((error) => [
        ...error,
        `"${password}" no debe contener espacios en blanco`,
      ]);
      setTimeout(() => {
        setError([]);
      }, 2500);
      return;
    }

    if (!regLower.test(password)) {
      setError((error) => [
        ...error,
        `"${password}" debe contener al menos una letra miniscula (a-z)`,
      ]);
      setTimeout(() => {
        setError([]);
      }, 2500);
      return;
    }

    if (!regUpper.test(password)) {
      setError((error) => [
        ...error,
        `"${password}" debe contener al menos una letra mayuscula (A-Z)`,
      ]);
      setTimeout(() => {
        setError([]);
      }, 2500);
      return;
    }

    if (!regNumber.test(password)) {
      setError((error) => [
        ...error,
        `"${password}" debe contener al menos un numero (0-9)`,
      ]);
      setTimeout(() => {
        setError([]);
      }, 2500);
      return;
    }

    if (!regSpecial.test(password)) {
      setError((error) => [
        ...error,
        `"${password}" debe contener al menos un caracter especial (!@#$%^&*])`,
      ]);
      setTimeout(() => {
        setError([]);
      }, 2500);
      return;
    }

    if (!regLength.test(password)) {
      setError((error) => [
        ...error,
        `"${password}" debe tener entre 8 y 20 caracteres`,
      ]);
      setTimeout(() => {
        setError([]);
      }, 2500);
      return;
    }

    if (password != repetirPassword) {
      setError((error) => [...error, "Las contraseñas no coinciden"]);
      setTimeout(() => {
        setError([]);
      }, 2500);
      return;
    }

    try {
      setLoad(true);
      const url = `${import.meta.env.VITE_URL_BACKEND}/api/clientes/olvide-password/${token}`;
      const response = await axios.post(url, { password });
      setLoad(false);
      setExito(response.data.msg);
      resetForm();
      setTimeout(() => {
          navigate('/');
      }, 1500);
    } catch (e) {
      setError((error) => [...error, e.response.data.msg]);
      setTimeout(() => {
        setError([]);
      }, 2500);
      setLoad(false);
      setTimeout(() => {
          navigate('/');
      }, 1500);
    }
  };

  return (
    <div>
      <form
        action="/olvide-password"
        className="bg-gray-200 p-12 w-full shadow-2xl"
        onSubmit={handdleSubmit}
      >
        {exito.length > 0 && (
          <>
            <legend className="uppercase font-bold text-center text-blue-500 sm:text-2xl sm:mb-8 md:text-3xl md:mb-8 lg:text-4xl lg:mb-8 xl:text-5xl xl:mb-8 2xl:text-5xl 2xl:mb-12">
              restablecer contraseña
            </legend>
            <fieldset className="flex flex-col gap-8">
              <div className="flex flex-col gap-y-2">
                <label className="grow uppercase sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl" htmlFor="password">
                  contraseña
                </label>
                <input
              className="border-none outline-none hover:shadow-lg w-full sm:text-sm sm:p-2 md:text-base md:p-2 lg:text-lg lg:p-2 xl:p-2 xl:text-xl 2xl:text-xl 2xl:p-4"
                  type="password"
                  placeholder="Introduce tu contraseña"
                  required
                  min="8"
                  autoComplete="on"
                  id="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>

              <div className="flex flex-col gap-y-2">
                <label className="grow uppercase sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl" htmlFor="repetir_password">
                  repetir contraseña
                </label>
                <input
              className="border-none outline-none hover:shadow-lg w-full sm:text-sm sm:p-2 md:text-base md:p-2 lg:text-lg lg:p-2 xl:p-2 xl:text-xl 2xl:text-xl 2xl:p-4"
                  type="password"
                  placeholder="Repite tu contraseña"
                  required
                  min="8"
                  autoComplete="on"
                  id="repetir_password"
                  value={repetirPassword}
                  onChange={(event) => setRepetirPassword(event.target.value)}
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
          </>
        )}

        {error.length > 0 && (
          <div className="flex flex-col justify-center items-center w-full">
            <div className="bg-red-500 text-white font-bold uppercase p-2 mt-3 w-full sm:text-sm md:text-base lg:text-lg xl:text-xl xl:p-4 2xl:text-xl 2xl:p-4">
              <p>{error}</p>
            </div>
          </div>
        )}

        {exito.length > 0 && (
          <div className="flex flex-col justify-center items-center w-full">
            <div className="bg-green-600 text-white font-bold uppercase p-2 mt-3 w-full sm:text-sm md:text-base lg:text-lg xl:text-xl xl:p-4 2xl:text-xl 2xl:p-4">
              <p>{exito}</p>
            </div>
          </div>
        )}

        <div className="text bold mt-6 capitalize underline w-full grid grid-cols-2 text-center gap-x-2">
          {exito.length > 0 && (
            <>
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
            </>
          )}

          {error.length > 0 && (
            <div className="hover:text-gray-400">
              <Link to="/" preventScrollReset={true}>
                volver a la pagina principal
              </Link>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default nuevoPassword;

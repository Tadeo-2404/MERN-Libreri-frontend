import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
//el usuario crea una nueva cuenta y se le envia un correo para confirmar su cuenta
const registrarse = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [error, setError] = useState([]);
  const [exito, setExito] = useState([]);
  const [load, setLoad] = useState(false);

  const resetForm = () => {
    setNombre("");
    setApellido("");
    setCorreo("");
    setTelefono("");
    setPassword("");
    setRepetirPassword("");
  };

  const handdleSubmit = async (event) => {
    setError([]);
    event.preventDefault();
    const regName = /^[a-zA-Z ]{2,30}$/;
    const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const regTel =
      /^[(]{0,1}[0-9]{2}[)]{0,1}[-\s\.]{0,1}[0-9]{4}[-\s\.]{0,1}[0-9]{4}$/;
    const regSpaces = /^(?=.*\s)/;
    const regLower = /^(?=.*[a-z])/;
    const regUpper = /^(?=.*[A-Z]).*$/;
    const regNumber = /^(?=.*[0-9])/;
    const regSpecial = /^(?=.*[~`!@#$%^&*()--+={}[]|\:;"'<>,.?_])/;
    const regLength = /^.{10,16}$/;

    if (!nombre || !apellido || !telefono || !correo || !password) {
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

    if (!regName.test(apellido)) {
      setError((error) => [
        ...error,
        `"${apellido}" no es apellido valido (gomez)`,
      ]);
      setTimeout(() => {
        setError([]);
      }, 2500);
      return;
    }

    if (!regTel.test(telefono)) {
      setError((error) => [
        ...error,
        `"${telefono}" no es telefono valido (00-0000-0000)`,
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
      const url = `${import.meta.env.VITE_URL_BACKEND}/api/clientes/registrarse`;
      const response = await axios.post(url, {
        nombre,
        apellido,
        correo,
        password,
        telefono,
      });
      setLoad(false);
      setExito((exito) => [...exito, response.data.msg]);
      setTimeout(() => {
        setExito([]);
        resetForm();
      }, 2500);
    } catch (e) {
      console.log(e);
      setError((error) => [...error, e.response.data.msg]);
      setTimeout(() => {
        setError([]);
      }, 2500);
      setLoad(false);
    }
  };

  return (
    <div>
      <form
        action="/registrarse"
        className="bg-gray-200 shadow-2xl w-full sm:p-8 md:p-8 lg:p-8 xl:p-8 2xl:p-12"
        onSubmit={handdleSubmit}
      >
        <legend className="uppercase font-bold text-center text-blue-500 sm:text-2xl sm:mb-8 md:text-3xl md:mb-8 lg:text-4xl lg:mb-8 xl:text-5xl xl:mb-8 2xl:text-5xl 2xl:mb-12">
          Registrarse
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
              className="border-none outline-none hover:shadow-lg w-full sm:text-sm sm:p-2 md:text-base md:p-2 lg:text-lg lg:p-2 xl:p-2 xl:text-xl 2xl:text-xl 2xl:p-4"
              type="text"
              placeholder="Introduce tu nombre"
              required
              id="nombre"
              autoComplete="on"
              onChange={(event) => setNombre(event.target.value)}
              value={nombre}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="grow uppercase sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl" htmlFor="apellido">
              apellido
            </label>
            <input
              className="border-none outline-none hover:shadow-lg w-full sm:text-sm sm:p-2 md:text-base md:p-2 lg:text-lg lg:p-2 xl:p-2 xl:text-xl 2xl:text-xl 2xl:p-4"
              type="text"
              placeholder="Introduce tu apellido"
              required
              id="apellido"
              autoComplete="on"
              onChange={(event) => setApellido(event.target.value)}
              value={apellido}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="grow uppercase sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl" htmlFor="telefono">
              telefono
            </label>
            <input
              className="border-none outline-none hover:shadow-lg w-full sm:text-sm sm:p-2 md:text-base md:p-2 lg:text-lg lg:p-2 xl:p-2 xl:text-xl 2xl:text-xl 2xl:p-4"
              type="tel"
              placeholder="XX-XXXX-XXXX"
              required
              id="telefono"
              autoComplete="on"
              pattern="[0-9]{2}-[0-9]{4}-[0-9]{4}"
              onChange={(event) => setTelefono(event.target.value)}
              value={telefono}
            />
          </div>

          <div className="flex flex-col gap-y-2">
            <label className="grow uppercase sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl" htmlFor="correo">
              correo
            </label>
            <input
              className="border-none outline-none hover:shadow-lg w-full sm:text-sm sm:p-2 md:text-base md:p-2 lg:text-lg lg:p-2 xl:p-2 xl:text-xl 2xl:text-xl 2xl:p-4"
              type="email"
              placeholder="Introduce tu correo"
              required
              id="correo"
              autoComplete="on"
              onChange={(event) => setCorreo(event.target.value)}
              value={correo}
            />
          </div>
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
              id="password"
              autoComplete="on"
              onChange={(event) => setPassword(event.target.value)}
              value={password}
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
              id="repetir_password"
              autoComplete="on"
              onChange={(event) => setRepetirPassword(event.target.value)}
              value={repetirPassword}
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
          value="registrarse"
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

        <div className="text-center mt-6 capitalize underline w-full flex  sm:grid sm:grid-row-2 sm:gap-y-6 sm:text-sm md:gap-y-6 md:text-base lg:gap-y-8 lg:text-lg xl:text-xl xl:gap-y-6 2xl:text-xl 2xl:gap-y-8">
          <div className="hover:text-gray-400 sm:m-0 mr-4">
            <Link to="/" preventScrollReset={true}>
              ¿ya tienes una cuenta? inicia sesion
            </Link>
          </div>
          <div className="hover:text-gray-400">
            <Link to="/olvide-password" preventScrollReset={true}>
              ¿olvidaste tu contraseña?
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default registrarse;

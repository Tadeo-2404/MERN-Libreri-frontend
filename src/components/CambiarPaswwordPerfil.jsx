import NavPerfil from "./NavPerfil";
import { useState } from "react";
import { Context } from "../context/ContextProvider";
import { useContext } from "react";

const CambiarPaswwordPerfil = () => {
  const { updatePassword } = useContext(Context);
  const [error, setError] = useState([]);
  const [exito, setExito] = useState([]);
  const [password_actual, setPassActual] = useState("");
  const [password_nuevo, setPassNuevo] = useState("");
  const regLower = /^(?=.*[a-z])/;
  const regUpper = /^(?=.*[A-Z]).*$/;
  const regNumber = /^(?=.*[0-9])/;
  const regSpecial = /^(?=.*[~`!@#$%^&*()--+={}[]|\:;"'<>,.?_])/;
  const regLength = /^.{10,16}$/;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password_actual == "" || password_nuevo == "") {
      setError((error) => [
        ...error,
        "todos los campos son obligatorios",
      ]);
      setTimeout(() => {
        setError([]);
      }, 2500);
      return;
    }
    
    if (!regLower.test(password_actual)) {
      setError((error) => [
        ...error,
        `"${password_actual}" debe contener al menos una letra miniscula (a-z)`,
      ]);
      setTimeout(() => {
        setError([]);
      }, 2500);
      return;
    }

    if (!regUpper.test(password_actual)) {
      setError((error) => [
        ...error,
        `"${password_actual}" debe contener al menos una letra mayuscula (A-Z)`,
      ]);
      setTimeout(() => {
        setError([]);
      }, 2500);
      return;
    }

    if (!regNumber.test(password_actual)) {
      setError((error) => [
        ...error,
        `"${password_actual}" debe contener al menos un numero (0-9)`,
      ]);
      setTimeout(() => {
        setError([]);
      }, 2500);
      return;
    }

    if (!regSpecial.test(password_actual)) {
      setError((error) => [
        ...error,
        `"${password_actual}" debe contener al menos un caracter especial (!@#$%^&*])`,
      ]);
      setTimeout(() => {
        setError([]);
      }, 2500);
      return;
    }

    if (!regLength.test(password_actual)) {
      setError((error) => [
        ...error,
        `"${password_actual}" debe tener entre 8 y 20 caracteres`,
      ]);
      setTimeout(() => {
        setError([]);
      }, 2500);
      return;
    }

    if (password_actual !== password_nuevo) {
      setError((error) => [
        ...error,
        "las contraseñas no coiciden",
      ]);
      setTimeout(() => {
        setError([]);
      }, 2500);
      return;
    }

    const succes = await updatePassword({password_actual, password_nuevo});
    if(succes.error) {
      setError((error) => [
        ...error,
        succes.msg
      ])
      setTimeout(() => {
        setError([]);
      }, 2500);
    } else {
      setExito((exito) => [
        ...exito,
        succes.msg
      ])
      setTimeout(() => {
        setExito([]);
      }, 2500);
    }

  };
  return (
    <>
      <NavPerfil />
      <div>
        <div>
          <form
            action="/admin/cambiar-password"
            className="bg-gray-200 shadow-2xl w-full sm:p-8 md:p-8 lg:p-8 xl:p-8 2xl:p-12"
            onSubmit={handleSubmit}
          >
            <legend className="uppercase font-bold text-center text-blue-500 sm:text-2xl sm:mb-8 md:text-3xl md:mb-8 lg:text-4xl lg:mb-8 xl:text-5xl xl:mb-8 2xl:text-5xl 2xl:mb-12">
              cambiar password
            </legend>
            <fieldset className="flex flex-col gap-8">
              <div className="flex flex-col gap-y-2">
                <label
                  className="grow uppercase sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl"
                  htmlFor="password"
                >
                  password actual
                </label>
                <input
                  className="border-none outline-none hover:shadow-lg w-full sm:text-sm sm:p-2 md:text-base md:p-2 lg:text-lg lg:p-2 xl:p-2 xl:text-xl 2xl:text-xl 2xl:p-4"
                  type="password"
                  placeholder="introduce tu password actual"
                  required
                  id="password_actual"
                  name="password_actual"
                  onChange={(e) =>
                    setPassActual(e.target.value)
                  }
                />
              </div>

              <div className="flex flex-col gap-y-2">
                <label
                  className="grow uppercase sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-xl"
                  htmlFor="password_nuevo"
                >
                  nuevo password
                </label>
                <input
                  className="border-none outline-none hover:shadow-lg w-full sm:text-sm sm:p-2 md:text-base md:p-2 lg:text-lg lg:p-2 xl:p-2 xl:text-xl 2xl:text-xl 2xl:p-4"
                  type="password"
                  placeholder="introduce tu nuevo password"
                  required
                  id="password_nuevo"
                  name="password_nuevo"
                  onChange={(e) =>
                    setPassNuevo(e.target.value)
                  }
                />
              </div>
            </fieldset>

            <input
              type="submit"
              value="cambiar contraseña"
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
        </div>
      </div>
    </>
  );
};

export default CambiarPaswwordPerfil;

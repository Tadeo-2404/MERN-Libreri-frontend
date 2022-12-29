import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmarCuenta = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [boolError, setBolError] = useState(false);
  const [boolExito, setBolExito] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${import.meta.env.VITE_URL_BACKEND}/api/clientes/confirmar-cuenta/${token}`;
        const response = await axios.get(url);
        setExito(response.data.msg);
        setBolExito(true);
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } catch (e) {
        setError(e.response.data.msg);
        setBolError(true);
        setTimeout(() => {
          navigate('/');
        }, 1500);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <form
        action="/confirmar-cuenta"
        className="bg-gray-200 p-12 w-full shadow-2xl"
      >
        {!boolExito && (
          <div className="flex flex-col justify-center items-center w-full">
            <div className="bg-red-500 text-center text-white font-bold uppercase p-3 mt-3 w-full">
              <p>{error}</p>
            </div>
          </div>
        )}

        {boolExito && (
          <div className="flex flex-col justify-center items-center w-full">
            <div className="bg-green-600 text-center text-white font-bold uppercase p-3 mt-3 w-full">
              <p>{exito}</p>
            </div>
          </div>
        )}

        {boolExito && (
          <div className="text bold mt-6 capitalize underline w-full grid grid-cols-2 text-center gap-x-2">
            <div className="hover:text-gray-400">
              <Link to="/" preventScrollReset={true}>
                ¿ya tienes una cuenta? inicia sesion
              </Link>
            </div>
          </div>
        )}

        {!boolExito && (
          <div className="text bold mt-6 capitalize underline w-full grid grid-cols-2 text-center gap-x-2">
            <div className="hover:text-gray-400">
              <Link to="/" preventScrollReset={true}>
                volver al menu principal
              </Link>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ConfirmarCuenta;

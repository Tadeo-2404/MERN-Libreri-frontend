import {createContext, useState,  useEffect} from 'react';
import axios from 'axios';
const Context = createContext();
//se manda a llamar en todos los componentes debido a que se lo pasamos por context.provider en APP

const ContextProvider = ({children}) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const authUser = async () => {
      const token = localStorage.getItem('token'); //obtenemos el item de local storage
      if(token == null) {
        setLoading(false);
        return;
      };
      
      const configuration = {
        headers: {
          "Content-Type": "application/json", //indicamos que es de tipo JSON
          Authorization: `Bearer ${token}` //usamos bearer token
        }
      }
      
      try {
        const url = `${import.meta.env.VITE_URL_BACKEND}/api/clientes/perfil`; //mandamos get para obtener perfil
        const {data} = await axios.get(url, configuration);
        setAuth(data);
      } catch (error) {
        console.log(error)
      }
      setLoading(false);
    }
    authUser();
  }, []);

  const logOut = () => {
    localStorage.removeItem('token');
    setAuth({});
  }

  const updateProfile = async (profile) => {
    console.log(profile)
    const token = localStorage.getItem('token'); //obtenemos el item de local storage
    if(token == null) {
      setLoading(false);
      return;
    };
    
    const configuration = {
      headers: {
        "Content-Type": "application/json", //indicamos que es de tipo JSON
        Authorization: `Bearer ${token}` //usamos bearer token
      }
    }

    try {
      const url = `${import.meta.env.VITE_URL_BACKEND}/api/clientes/perfil/${profile._id}`; //mandamos get para obtener perfil
      const {data} = await axios.put(url, profile ,configuration);
      console.log(data);
      return {
        msg: "actualizado correctamente",
      }
      console.log(data);
    } catch (error) {
      console.log(error)
    }
  }

  const updatePassword = async (credentials) => {
    const token = localStorage.getItem('token'); //obtenemos el item de local storage
    if(token == null) {
      setLoading(false);
      return;
    };
    
    const configuration = {
      headers: {
        "Content-Type": "application/json", //indicamos que es de tipo JSON
        Authorization: `Bearer ${token}` //usamos bearer token
      }
    }

    try {
      const url = `${import.meta.env.VITE_URL_BACKEND}/api/clientes/cambiar-password`; //mandamos get para obtener perfil
      const {data} = await axios.put(url, credentials ,configuration);
      console.log(data);
      return {
        msg: "actualizado correctamente",
        error: false
      }
    } catch (error) {
      return {
        msg: error.response.data.msg,
        error: true
      }
    }
  }
  
  return (
    <Context.Provider value={{auth, setAuth, loading, logOut, updateProfile, updatePassword}}>
        {children}
    </Context.Provider>
  )
}

export {
    Context
}

export default ContextProvider
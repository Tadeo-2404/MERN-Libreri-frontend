import {createContext, useState,  useEffect} from 'react';
import axios from 'axios';

const LibrosContext = createContext();

const ContextProviderLibros = ({children}) => {
    const [libros, setLibros] = useState([]);
    const [libro, setLibro] = useState({});

    const storeLibros = async (libro) => {
        const token = localStorage.getItem('token');
        const configuration = {
            headers: {
              "Content-Type": "application/json", //indicamos que es de tipo JSON
              Authorization: `Bearer ${token}` //usamos bearer token
            }
          }

        if(libro.id) {
            try {
                const {data} = await axios.put(`${import.meta.env.VITE_URL_BACKEND}/api/libros/${libro.id}`, libro, configuration);
                const updated = libros.map(lib => lib._id === data._id ? data : lib)
                setLibros(updated)
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const {data} = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/api/libros`, libro, configuration);
                console.log(data);
                const {__v, ...libroGuardado} = data;
                setLibros((libros) => [...libros, libroGuardado]);
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        const getLibros = async () => {
            try {
                const token = localStorage.getItem('token');
                const configuration = {
                    headers: {
                      "Content-Type": "application/json", //indicamos que es de tipo JSON
                      Authorization: `Bearer ${token}` //usamos bearer token
                    }
                  }
                const {data} = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/api/libros`, configuration);
                setLibros([]);
                setLibros(data);
    
            } catch (error) {
                console.log(error)
            }
        }
        getLibros();
    }, [])

    const editLibro = (libro) => {
        setLibro(libro)
    }

    const deleteLibro = async (libro) => {
        const token = localStorage.getItem('token');
        const configuration = {
            headers: {
                "Content-Type": "application/json", //indicamos que es de tipo JSON
                Authorization: `Bearer ${token}` //usamos bearer token
            }
        }
        
        const authDelete = confirm(`Deseas eliminar ${libro.titulo}?`);
        if(authDelete) {
            try {
                const {data} = await axios.delete(`${import.meta.env.VITE_URL_BACKEND}/api/libros/${libro._id}`, configuration);
                const updated = libros.filter(lib => lib._id != libro._id)
                setLibros(updated);
            } catch (error) {
                console.log(error);
            }
        } 
    }
    

    return (
        <LibrosContext.Provider value={{libros, storeLibros, editLibro, deleteLibro ,libro}}>
            {children}
        </LibrosContext.Provider>
    )
}

export {
    ContextProviderLibros,
}

export default LibrosContext
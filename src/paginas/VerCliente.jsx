import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const VerCliente = () => {
  const [cliente, setCliente] = useState({});

  //carag de componentes
  const [cargando, setCargando] = useState(false);

  const { id } = useParams();

  //peticion para importe nuestro APpi
  useEffect(() => {
    setCargando(!cargando); //ya añadir valor contrario en el useState actual
    const obtenerClienteAPI = async () => {
      //en caso de que hay error
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
      setTimeout(() => {
        setCargando(false);
      }, 2000);
    };
    obtenerClienteAPI();
  }, []); //solo queremos obtener una ver nuestro dato

  return Object.keys(cliente).length === 0 ? (
    <p>no hay Resultados</p>
  ) : (
    <div>
      {cargando ? (
        <Spinner />
      ) : (
        <>
          <h1 className="font-black text-4xl text-blue-900">
            Ver Cliente: {cliente.nombre}
          </h1>
          <p className="mt-3">informacion del cliente</p>

          {cliente.nombre && (
            <p className="text-2xl text-gray-600 mt-10">
              <span className="uppercase font-bold">Cliente: </span>
              {cliente.nombre}
            </p>
          )}
          {cliente.email && (
            <p className="text-2xl text-gray-600 mt-4">
              <span className="text-gray-800 uppercase font-bold">Email: </span>
              {cliente.email}
            </p>
          )}
          {cliente.telefono && (
            <p className="text-2xl text-gray-600 mt-4">
              <span className="text-gray-800 uppercase font-bold">
                Teléfono:{" "}
              </span>
              {cliente.telefono}
            </p>
          )}
          {cliente.empresa && (
            <p className="text-2xl text-gray-600 mt-4">
              <span className="text-gray-800 uppercase font-bold">
                Empresa:{" "}
              </span>
              {cliente.empresa}
            </p>
          )}
          {/* pasar una condicion en caso no tener notas */}
          {cliente.notas && (
            <p className="text-2xl text-gray-600 mt-4">
              <span className="text-gray-800 uppercase font-bold">Notas: </span>
              {cliente.notas}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default VerCliente;

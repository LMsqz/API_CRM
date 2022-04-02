import { useState, useEffect } from "react";
import Cliente from "../components/Cliente";

const Inicio = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    //una funcion acioncrona
    const obtenerClientesAPI = async () => {
      try {
        const url = "http://localhost:4000/clientes";
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setClientes(resultado);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerClientesAPI();
  }, []);

  // eliminar
  const handleEliminar = async (id) => {
    const confirmar = confirm("¿Deseas elimanar este cliente?");

    if (confirmar) {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const respuesta = await fetch(url, {
          method: "DELETE",
        });

        await respuesta.json();

        // para tener un perfoma actulizado actulise el useState
        const arrayClientes = clientes.filter((cliente) => cliente.id !== id);
        setClientes(arrayClientes);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Lista de clientes</h1>
      <p className="mt-3">Administre tus clientes</p>

      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead className="bg-yellow-500 text-black">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <Cliente
              key={cliente.id}
              cliente={cliente}
              handleEliminar={handleEliminar}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Inicio;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TableRow from "../components/TableRow";
import { useUser } from "../context/UserContext";
import { getBooks } from "../services/firestore";

const BookAdmin = () => {
  const { user } = useUser();
  const [books, setBooks] = useState([]);
  useEffect(() => {
    getBooks().then((res) => {
      setBooks(res);
      console.log("tengo libros");
    });
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Administrador de libros</h1>
      {user ? (
        <div>
          <Link to={"/new-book"}>Nuevo Libro</Link>

          <div className="md:px-32 py-8 w-full">
            <div className="shadow overflow-hidden rounded border-b border-gray-200">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Libro
                    </th>
                    <th className="w-1/16 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Año
                    </th>
                    <th className="w-1/4 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Imagen
                    </th>
                    <th className="w-1/16 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Editar
                    </th>
                    <th className="w-1/16 text-left py-3 px-4 uppercase font-semibold text-sm">
                      Eliminar
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {books.map((book) => (
                    <TableRow
                      key={book.id}
                      id={book.id}
                      title={book.title}
                      year={book.year}
                      image={book.image}
                    ></TableRow>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <p>No tienes permiso de ver esta pagina</p>
      )}
    </div>
  );
};

export default BookAdmin;

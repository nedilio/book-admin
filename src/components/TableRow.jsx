import React from "react";
import { Link } from "react-router-dom";

const TableRow = ({
  title,
  year,
  id,
  image = "https://via.placeholder.com/150/000000/FFFFFF/?text=book-image",
}) => {
  const handleDeleteBook = (id) => {
    console.log(id);
    deleteBook(id);
  };
  return (
    <tr>
      <td className="text-left py-3 px-4">{title}</td>
      <td className="text-left py-3 px-4">{year}</td>
      <td className="text-left py-3 px-4">
        <img src={image} alt="" />
      </td>
      <td className="text-left py-3 px-4">
        <Link to={`/edit-book/${id}`}>📝</Link>
      </td>
      <td className="text-left py-3 px-4">
        <button onClick={() => handleDeleteBook(id)}>🗑</button>
      </td>
    </tr>
  );
};

export default TableRow;

import { getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createBook,
  getSingleBook,
  saveImage,
  updateBook,
} from "../services/firestore";

const EditBook = () => {
  const [book, setBook] = useState({});
  const [task, setTask] = useState(null);
  const [imageURL, setImageURL] = useState(
    "https://via.placeholder.com/150/000000/FFFFFF/?text=sin-imagen"
  );
  const id = useParams().id;
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getSingleBook(id).then((res) => {
        setBook(res);
        document.getElementById("title").value = res.title;
        document.getElementById("year").value = res.year;
        console.log("single book: ", res);
      });
    }
  }, []);

  useEffect(() => {
    if (task) {
      const onProgress = () => {};
      const onError = () => {};
      const onCompleted = () => {
        console.log("onCompleted", task.snapshot);
        getDownloadURL(task.snapshot.ref).then((res) => {
          setImageURL(res);
          setBook({ ...book, image: res });
        });
      };
      task.on("state_changed", onProgress, onError, onCompleted);
      console.log(task);
    } else {
      console.log(task);
    }
  }, [task]);

  const handleSave = (e) => {
    e.preventDefault();
    console.log("save book", book);
    updateBook(id, book);
    navigate("/book-admin");
  };

  const handleChangeTitle = (e) => {
    const { value } = e.target;
    setBook({ ...book, title: value });
  };
  const handleChangeYear = (e) => {
    const { value } = e.target;
    setBook({ ...book, year: value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const id = await createBook(book);
    console.log("crear libro:", book, id);
    updateBook(id, { ...book, id });
    navigate("/book-admin");
  };

  const handleFile = () => {
    const file = document.getElementById("file").files[0];
    const task = saveImage(file);
    setTask(task);
  };

  return (
    <div>
      <form action="" className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div>
          <label
            htmlFor="title"
            className="inline-block text-sm font-bold mb-2 w-1/2 py-2"
          >
            Titulo
          </label>
          <input
            className="shadow appearance-none border rounded w-1/2 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            name="title"
            id="title"
            type="text"
            onChange={handleChangeTitle}
          />
        </div>
        <div>
          <label
            className="inline-block text-sm font-bold mb-2 w-1/2 py-2"
            htmlFor="year"
          >
            Año
          </label>
          <input
            className="shadow appearance-none border rounded w-1/2 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            name="year"
            id="year"
            type="number"
            onChange={handleChangeYear}
          />
        </div>

        <div>
          <label
            htmlFor="file"
            className="inline-block text-sm font-bold mb-2 w-full py-2"
          >
            Imagen
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            type="file"
            name="file"
            id="file"
            onChange={handleFile}
          />
        </div>
        <div className="my-4">
          {
            <img
              className="w-40 h-40 object-cover	"
              src={imageURL}
              alt="book-image"
            />
          }
        </div>
        {id ? (
          <button onClick={(e) => handleSave(e)}>Guardar</button>
        ) : (
          <button onClick={(e) => handleCreate(e)}>Crear</button>
        )}
      </form>
    </div>
  );
};

export default EditBook;

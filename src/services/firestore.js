import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

import { app } from "./firebase";

const db = getFirestore(app);
const storage = getStorage(app);

export const saveImage = (file) => {
  const metadata = {
    contentType: "image/jpeg",
  };
  const storageRef = ref(storage, `images/${file.name}`);
  const task = uploadBytesResumable(storageRef, file, metadata);
  return task;
};

export const getBooks = async () => {
  const booksCollection = collection(db, "books");
  const booksSnapshot = await getDocs(booksCollection);
  let books = booksSnapshot.docs.map((book) => {
    return { ...book.data(), id: book.id };
  });
  return books;
};

export const getSingleBook = async (id) => {
  const bookRef = doc(db, "books", id);
  const book = await getDoc(bookRef);
  return { ...book.data(), id: book.id };
};

export const updateBook = (id, book) => {
  const bookRef = doc(db, "books", id);
  updateDoc(bookRef, book);
};
export const deleteBook = (id) => {
  const bookRef = doc(db, "books", id);
  deleteDoc(bookRef);
};

export const createBook = async (book) => {
  const bookCollectionRef = collection(db, "books");
  const newBook = await addDoc(bookCollectionRef, book);
  console.log("nuevo libro id: ", newBook);
  return newBook.id;
};

export const createUserDB = async (user) => {
  const { email, uid } = user;
  const userRef = doc(db, `users/${uid}`);
  setDoc(userRef, { email, uid, rol: "" }).then((data) =>
    console.log("usuario creado: ", data)
  );
};

export const getUserDB = async (id) => {
  const userRef = doc(db, "users", id);
  const user = await getDoc(userRef);
  return { ...user.data() };
};

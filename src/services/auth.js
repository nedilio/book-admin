import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "./firebase";
import { createUserDB } from "./firestore";

const auth = getAuth(app);

export const createUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential);
      const user = userCredential.user;
      console.log(user);
      createUserDB(user);
      return user;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signInUser = (user) => {
  const { email, password } = user;
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      console.log(error);
    });
};

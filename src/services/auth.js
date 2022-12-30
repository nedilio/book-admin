import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useId } from "react";
import { app } from "./firebase";

export const auth = getAuth(app);

export const createUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
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

export const logout = () => {
  signOut(auth);
};

export const onAuthStateChangedCheck = (onChange) => {
  return onAuthStateChanged(auth, (user) => {
    const { uid, displayName, photoURL, email } = user;
    const normalizedUser = { uid, displayName, photoURL, email };
    onChange(normalizedUser);
  });
};

export const currentUser = () => {
  updateProfile(auth.currentUser, {
    displayName: "Nelson Izquierdo",
    photoURL: "https://avatars.githubusercontent.com/u/2835435?v=4",
    role: "admin",
  })
    .then(() => {
      // Profile updated!
      // ...
    })
    .catch((error) => {
      // An error occurred
      // ...
    });
};

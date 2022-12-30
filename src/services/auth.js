import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
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
    console.log(user);
    if (user) {
      const { uid, displayName, photoURL, email } = user;
      const normalizedUser = { uid, displayName, photoURL, email };
      onChange(normalizedUser);
    } else {
      onChange(user);
    }
  });
};

export const updateUser = (user) => {
  return updateProfile(auth.currentUser, user);
};

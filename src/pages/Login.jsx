import { stringify } from "postcss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, signInUser } from "../services/auth";
import { createUserDB } from "../services/firestore";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [haveAccount, setHaveAccount] = useState(true);
  const navigate = useNavigate();

  const ERRORCODES = {
    "auth/invalid-email": "Email inválido",
    "auth/weak-password": "La contraseña debe tener por lo menos 6 caracteres",
    "auth/email-already-in-use": "El correo ya existe",
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    createUser(user.email, user.password)
      .then(async (userCredential) => {
        setError(null);
        const user = userCredential.user;
        const userDB = await createUserDB(user);
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, rol: userDB.rol })
        );
        navigate(`/profile/${user.uid}`);
      })
      .catch((error) => {
        console.error(error.message);
        setError(ERRORCODES[error.code]);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("login", user);
    signInUser(user).then((userCreated) => {
      navigate(`/profile/${userCreated.uid}`);
    });
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>{haveAccount ? "Iniciar sesion" : "Crear cuenta"}</h1>
      <form action="" className="border-zinc-800 border-2 p-4">
        {error && <p>Error: {error}</p>}
        <label
          htmlFor="email"
          className="inline-block text-sm font-bold mb-2 w-1/2 py-2"
        >
          email
        </label>
        <input
          onChange={handleChange}
          type="text"
          name="email"
          id="email"
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        />
        <label
          htmlFor="password"
          className="inline-block text-sm font-bold mb-2 w-1/2 py-2"
        >
          Password
        </label>
        <input
          onChange={handleChange}
          type="password"
          name="password"
          id="password"
          className="shadow appearance-none border rounded w-1/2 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button onClick={haveAccount ? handleLogin : handleCreateAccount}>
          {haveAccount ? "Login" : "Crear cuenta"}
        </button>
      </form>
      <button onClick={() => setHaveAccount(!haveAccount)}>
        {haveAccount ? "Crear Cuenta" : "Iniciar sesion"}
      </button>
    </div>
  );
};

export default Login;

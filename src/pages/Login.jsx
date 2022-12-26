import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { createUser, signInUser } from "../services/auth";

const Login = () => {
  const { loggedUser } = useUser();

  const [user, setUser] = useState({ email: "", password: "" });
  const [haveAccount, setHaveAccount] = useState(true);
  const navigate = useNavigate();

  const handleCreateAccount = (e) => {
    e.preventDefault();
    createUser(user.email, user.password).then((userCreated) => {
      loggedUser(userCreated);
      navigate("/");
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("login", user);
    signInUser(user).then((userCreated) => {
      loggedUser(userCreated);
      navigate("/");
    });
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h1>{haveAccount ? "Iniciar sesion" : "Crear cuenta"}</h1>
      <form action="" className="border-zinc-800 border-2 p-4">
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

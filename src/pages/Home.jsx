import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { getUserDB } from "../services/firestore";

const Home = () => {
  const { user, loggedUser } = useUser();
  console.log(user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      getUserDB(user.uid).then((userDB) => {
        loggedUser({ ...user, rol: userDB.rol });
      });
    }
  }, []);

  return (
    <div>
      <h1>Home</h1>
      {user && (
        <div>
          <h3>User Info</h3>
          <p>email: {user.email}</p>
          {user.rol && <p>rol: {user.rol}</p>}
        </div>
      )}
    </div>
  );
};

export default Home;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import User from "../components/User";
import useUser, { USER_STATES } from "../hooks/useUser";

const Home = () => {
  const user = useUser();

  return (
    <div>
      <h1>Home</h1>
      {user === USER_STATES.NOT_KNOWN && <Loader />}
      {user && user.uid && <User user={user} />}
    </div>
  );
};

export default Home;

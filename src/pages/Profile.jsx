import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import ProfileForm from "../components/ProfileForm";
import useUser from "../hooks/useUser";
import { currentUser } from "../services/auth";
import { getUserDB } from "../services/firestore";

const Profile = () => {
  const [userDB, setUserDB] = useState({});
  const user = useUser();
  const { id } = useParams();
  useEffect(() => {
    getUserDB(id).then(setUserDB);
  }, []);

  return user === undefined ? (
    <Loader />
  ) : (
    <div>
      <h2>Profile</h2>
      <ProfileForm user={user} userDB={userDB} />
    </div>
  );
};

export default Profile;

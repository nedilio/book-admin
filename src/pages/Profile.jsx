import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import ProfileForm from "../components/ProfileForm";
import useUser from "../hooks/useUser";

const Profile = () => {
  const user = useUser();
  useEffect(() => {}, []);

  return (
    <>
      {user === undefined && <Loader />}
      {user && user.uid && (
        <div>
          <h2>Profile</h2>
          <ProfileForm user={user} />
        </div>
      )}
    </>
  );
};

export default Profile;

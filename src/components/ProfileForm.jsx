import React, { useEffect, useState } from "react";

const ProfileForm = ({ user, userDB }) => {
  const [userProfile, setUserProfile] = useState({ ...user, ...userDB });
  console.log(userProfile);
  useEffect(() => {
    document.getElementById("displayName").value = userProfile.displayName;
    document.getElementById("rol").value = userProfile.rol;
  }, []);

  return (
    <div>
      <form>
        <input type="text" name="displayName" id="displayName" />
        <input type="file" name="file" id="file" />
        <select name="rol" id="rol">
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </form>
    </div>
  );
};

export default ProfileForm;

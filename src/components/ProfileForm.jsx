import { getDownloadURL } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { logout, updateUser } from "../services/auth";
import { saveImage } from "../services/firestore";
import Ribbon from "./Ribbon";

const ProfileForm = ({ user }) => {
  const [updated, setUpdated] = useState(false);
  const [userProfile, setUserProfile] = useState({ ...user });
  const [task, setTask] = useState(null);
  const [imageURL, setImageURL] = useState(
    "https://via.placeholder.com/150/000000/FFFFFF/?text=sin-imagen"
  );

  useEffect(() => {
    document.getElementById("displayName").value = userProfile.displayName;
    user.photoURL && setImageURL(user.photoURL);
  }, []);
  useEffect(() => {
    if (task) {
      const onProgress = () => {};
      const onError = () => {};
      const onCompleted = () => {
        console.log("onCompleted", task.snapshot);
        getDownloadURL(task.snapshot.ref).then((res) => {
          setImageURL(res);
          setUserProfile({ ...userProfile, photoURL: res });
        });
      };
      task.on("state_changed", onProgress, onError, onCompleted);
    }
  }, [task]);

  const handleFile = () => {
    const file = document.getElementById("file").files[0];
    console.log(file.name);
    const task = saveImage(file, "users");
    setTask(task);
  };

  const handleChange = (e) => {
    setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUser(userProfile)
      .then(() => {
        console.log("Profile Updated!");
        setUpdated(true);
        setTimeout(() => {
          setUpdated(false);
        }, 4000);
        // deberiamos mostrar algo
      })
      .catch(console.log("Error"));
  };

  return (
    <div className="">
      {updated && <Ribbon text={"Perfil Actualizado con exito!"} />}
      <form onSubmit={handleSaveProfile}>
        <input
          type="text"
          name="displayName"
          id="displayName"
          onChange={handleChange}
        />

        <div className="my-4">
          <input type="file" name="file" id="file" onChange={handleFile} />
          <img
            className="w-24 h-24 object-cover	border rounded border-slate-300"
            src={imageURL}
            alt={user.displayName}
            width={96}
            height={96}
          />
        </div>
        <button>Update</button>
      </form>
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Cerrar Sesion
      </button>
    </div>
  );
};

export default ProfileForm;

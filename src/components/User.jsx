import React from "react";
import { Link } from "react-router-dom";

const User = ({ user }) => {
  return (
    <Link to={`/profile/${user.uid}`}>
      <div className="flex justify-center items-center border-slate-300 border-2 p-2 rounded-xl box-border">
        <img
          className="rounded-full"
          src={user.photoURL}
          alt={user.displayName}
          width="50"
          height={50}
        />
        <strong className="mx-4">{user.displayName}</strong>
      </div>
    </Link>
  );
};

export default User;

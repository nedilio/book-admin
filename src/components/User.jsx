import React from "react";
import { Link } from "react-router-dom";

const User = ({ user }) => {
  return (
    <Link to={`/profile/${user.uid}`}>
      <div className="flex justify-center items-center border-slate-300 border-2 p-2 rounded-xl box-border">
        {user.photoURL ? (
          <img
            className="rounded-full"
            src={user.photoURL}
            alt={user.displayName}
            width={64}
            height={64}
          />
        ) : (
          <div className="bg-slate-400 text-slate-100 rounded-full w-16 h-16 flex items-center justify-center uppercase">
            {user.displayName
              ? user.displayName.match(/\b(\w)/g)
              : user.email.split("")[0]}
          </div>
        )}
        <strong className="mx-4">
          {user.displayName ? user.displayName : user.email}
        </strong>
      </div>
    </Link>
  );
};

export default User;

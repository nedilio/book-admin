import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChangedCheck } from "../services/auth";

export const USER_STATES = {
  NOT_LOGGED: null,
  NOT_KNOWN: undefined,
};

export default function useUser() {
  const [user, setUser] = useState(USER_STATES.NOT_KNOWN);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChangedCheck(setUser);
  }, []);

  useEffect(() => {
    user === USER_STATES.NOT_LOGGED && navigate("/login");
  }, [user]);

  return user;
}

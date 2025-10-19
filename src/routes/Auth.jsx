import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../contexts/User/UserContext";

export default function AuthRoute({ component: Component }) {
  const ctx = useContext(UserContext);
  const { authState, verifytoken } = ctx;

  useEffect(() => {
    verifytoken();
  }, [authState]);

  return <>{authState ? <Navigate to="/perfil" /> : <Component />}</>;
}

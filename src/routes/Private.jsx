import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../contexts/User/UserContext";

export default function PrivateRoute({ component: Component }) {
  const ctx = useContext(UserContext);
  const { authState, verifytoken } = ctx;
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    verifytoken();
    setLoading(false);
  }, [authState]);

  if (loading) return null;
  return <>{authState ? <Component /> : <Navigate to="/iniciar-sesion" />}</>;
}

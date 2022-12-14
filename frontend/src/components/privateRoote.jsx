import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute() {
  const token = JSON.parse(localStorage.getItem("token"));

  if (token) return <Outlet />;
  else <Navigate to="/login" />;
}

export default PrivateRoute;

import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../pages/Loading/Loading";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <Loading />;
  }
  if (user == null) {
    return <Navigate state={location.pathname} to={"/auth/login"} replace/>;
  }
  return children;
};

export default PrivateRoute;

import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../../Store";

type Props = {
  children: JSX.Element;
};

const Protected: React.FC<Props> = ({ children }) => {
  const {_id} = useSelector((state: RootState) => state.auth);

  //const { isAuthenticated } = useAuth();
  const location = useLocation().pathname;

  return _id ? (
    children
  ) : (
    <Navigate to={"/auth"} state={{ from: location }} replace />
  );
};

export default Protected;
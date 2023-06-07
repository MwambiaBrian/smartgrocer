
 

import React from "react";
import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "../../Store";

type Props = {
  children: JSX.Element;
};

const UnAuthenticated: React.FC<Props> = ({ children }) => {
    const {_id} = useSelector((state: RootState) => state.auth);
  //const { isAuthenticated } = useAuth();

  return !_id ? children : <Navigate to={"/home"} replace />;
};

export default UnAuthenticated;
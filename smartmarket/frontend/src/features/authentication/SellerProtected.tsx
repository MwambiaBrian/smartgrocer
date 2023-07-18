import React from "react";
import { Link, Navigate, useLocation } from "react-router-dom";

import Protected from "./Protected";
import { RootState } from "../../Store";
import { useSelector } from "react-redux";

type Props = {
  children: JSX.Element;
};

const AdminProtected: React.FC<Props> = ({ children }) => {
  //const { user: userAuth } = useAuth() as AuthStateType;
  const {role} = useSelector((state: RootState) => state.auth);

  return (
    <Protected>
      {role === "seller" ? (
        children
      ) : (
        <>
          <h1>Forbidden</h1>
          <Link to={"/"}>Home</Link>
        </>
      )}
    </Protected>
  );
};

export default AdminProtected;
import React from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { AuthStateType } from "../state/types";
import Protected from "./Protected";
import { RootState } from "../../Store";
import { useSelector } from "react-redux";

type Props = {
  children: JSX.Element;
};

const AdminProtected: React.FC<Props> = ({ children }) => {
  //const { user: userAuth } = useAuth() as AuthStateType;
  const userAuth = useSelector((state: RootState) => state.auth);

  return (
    <Protected>
      {userAuth?.role === "admin" ? (
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
import React, { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { AuthenticationContex } from "../services/Auth/Auth.context";
import AuthenticationContextProvider from "../services/Auth/AuthContextProvider";

const Protected = () => {
	const { token } = useContext(AuthenticationContex);

	if (!token) {
		return <Navigate to={"/login"} replace />;
	}
	return <Outlet />;
};

export default Protected;

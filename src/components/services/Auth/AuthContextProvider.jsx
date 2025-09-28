import { useState } from "react";
import { AuthenticationContex } from "./Auth.context";

const tokenValue = localStorage.getItem("login-token");

export const AuthenticationContextProvider = ({ children }) => {
	const [token, setToken] = useState(tokenValue);
	const handleLogin = (token) => {
		localStorage.setItem("login-token", token);
		setToken(token);
	};

	const handlelogOut = () => {
		localStorage.removeItem("login-token");
		setToken(null);
	};

	return (
		<AuthenticationContex value={(token, handleLogin, handlelogOut)}>
			{children}
		</AuthenticationContex>
	);
};

export default AuthenticationContextProvider;

import { useState } from "react";
import { AuthenticationContex } from "./Auth.context";

const tokenValue = localStorage.getItem("login-token");

export const AuthenticationContextProvider = ({ children }) => {
	const [token, setToken] = useState(tokenValue);

	const handleLogin = (token) => {
		localStorage.setItem("login-token", token);
		setToken(token);
	};

	const handleLogOut = () => {
		setToken(null);
		localStorage.removeItem("login-token");
		localStorage.removeItem("user-name");
		localStorage.removeItem("user-surname");
		localStorage.removeItem("user-email");
		localStorage.removeItem("user-dni");
	};

	return (
		<AuthenticationContex value={{ token, handleLogin, handleLogOut }}>
			{children}
		</AuthenticationContex>
	);
};

export default AuthenticationContextProvider;

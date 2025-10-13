import { useState } from "react";
import { UserTypeContext } from "./UserType.context";
import { jwtDecode } from "jwt-decode";

export const UserTypeContextProvider = ({ children }) => {
	const [userType, setUserType] = useState();
	const userTokenType = (token) => {
		if (token) {
			const decoded = jwtDecode(token);
			setUserType(decoded.typeUser);
		}
	};

	return (
		<UserTypeContext value={{ userTokenType, userType }}>
			{children}
		</UserTypeContext>
	);
};

export default UserTypeContextProvider;

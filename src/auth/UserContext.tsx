import React from "react";
import { UserData } from "../types/user";

interface UserContextProps {
	userData: UserData;
	setUserData: (userData: UserData) => void;
}
const UserContext = React.createContext<Partial<UserContextProps>>({});

const UserProvider: React.FC = props => {
	const [userData, setUserData] = React.useState<UserData | undefined>(
		undefined,
	);
	return (
		<UserContext.Provider value={{ userData, setUserData }}>
			{props.children}
		</UserContext.Provider>
	);
};

const useUserContext = () => {
	const context = React.useContext(UserContext);
	if (context === undefined || context.setUserData === undefined) {
		throw new Error(
			"useUserContext must be used in a valid UserContextProvider",
		);
	}
	return context;
};

export { UserProvider, useUserContext };

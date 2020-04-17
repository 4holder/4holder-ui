import React from 'react';
import {Redirect, RouteComponentProps} from '@reach/router';
import auth from "../../../auth/auth";
import Skeleton from "../../common/Skeleton/Skeleton";

const AuthenticatedPage: React.FC<RouteComponentProps> = ({
  children,
}: any) => {
	if( auth.isAuthenticated() ) {
		return (
				<Skeleton>
					{children}
				</Skeleton>
			);
		}

		return <Redirect to={"/"} noThrow/>;
};

export default AuthenticatedPage;
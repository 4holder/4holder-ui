import React from 'react';
import { RouteComponentProps } from '@reach/router';

const AuthenticatedPage: React.FC<RouteComponentProps> = ({
  children,
  location,
}: any) => {
	return (
		<div>{children}</div>
	);
};

export default AuthenticatedPage;
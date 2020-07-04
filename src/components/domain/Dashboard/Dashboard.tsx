import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Typography } from "@material-ui/core";
import AuthenticatedPage from "../AuthenticatedPage";

const Dashboard: React.FC<RouteComponentProps> = () => {
	return (
		<AuthenticatedPage>
			<Typography variant="h3" component="span">
				Oh, something would be here. Maybe some charts and tables in a good dashboard!
			</Typography>
		</AuthenticatedPage>
	);
};

export default Dashboard;
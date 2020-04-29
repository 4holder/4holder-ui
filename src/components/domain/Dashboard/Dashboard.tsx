import React from 'react';
import { RouteComponentProps } from '@reach/router';
import { Typography } from "@material-ui/core";
import AuthenticatedPage from "../AuthenticatedPage";

const Dashboard: React.FC<RouteComponentProps> = () => {
	return (
		<AuthenticatedPage>
			<Typography variant="h3" component="span">
				O conteúdo do dashboard ficará aqui.
			</Typography>
		</AuthenticatedPage>
	);
};

export default Dashboard;
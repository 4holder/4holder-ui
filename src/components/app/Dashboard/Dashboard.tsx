import React from 'react';
import { Redirect, RouteComponentProps } from '@reach/router';
import auth from '../../../auth/auth';


const Dashboard: React.FC<RouteComponentProps> = () => {
	const logout = () => {
		auth.logout();
		return (<Redirect to={`/`} noThrow />);
	};

	return (
		<div>
			<h1>
			{
				( auth.isAuthenticated() ) ? <b>Authenticated!</b> :  <i>Not authenticated!</i>
			}
			</h1>

			<br />
			<hr />
			<br />

			{
				(auth.isAuthenticated()) ?
					(<button className="btn btn-danger log" onClick={() => logout()}>Log out </button>) :
					(<button className="btn btn-info log" onClick={() => auth.login()}>Log In</button>)
			}
		</div>
	);
};

export default Dashboard;
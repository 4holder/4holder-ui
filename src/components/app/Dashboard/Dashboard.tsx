import React, {useEffect, useState} from 'react';
import { RouteComponentProps } from '@reach/router';
import {Typography} from "@material-ui/core";
import Skeleton from "../../common/Skeleton/Skeleton";
import { getUserProfile, UserProfile } from "../../../clients/publicApiClient";

const Dashboard: React.FC<RouteComponentProps> = () => {
	const [
		userProfile,
		setState
	] = useState({} as UserProfile);

	useEffect( () => {
		getUserProfile().then(userProfile => setState(userProfile));
	}, []);

	return (
		<Skeleton>
			<Typography variant="h3" component="span">
				<img src={userProfile.picture} height={100}/>
				<br />
				Seja bem vindo, {userProfile.firstName}!
			</Typography>
		</Skeleton>
	);
};

export default Dashboard;
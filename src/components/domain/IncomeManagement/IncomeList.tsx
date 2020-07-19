import React, {useEffect, useState} from 'react';
import {RouteComponentProps} from '@reach/router';
import {Button, createStyles, Grid, Link, Theme, Typography} from "@material-ui/core";
import AuthenticatedPage from "../AuthenticatedPage";
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import {IncomeResume} from "./types";
import Dinero from "dinero.js";
import IncomeProjectionChart from "./IncomeProjectionChart";
import {useQuery} from 'react-apollo';
import {gql} from "apollo-boost";
import ListItemMenu from "./ListItemMenu";

const useStyles = makeStyles((theme: Theme) => createStyles({
		cover: {
			minWidth: 700,
		},
		paper: {
			padding: theme.spacing(2),
			textAlign: 'center',
			color: theme.palette.text.secondary,
		},
		button: {
			margin: theme.spacing(1),
		},
	})
);

export const GET_FINANCIAL_CONTRACTS_QUERY = gql`
query($page: Int!, $pageSize: Int!) {
  incomeResumes: getIncomeResumes(page: $page, pageSize: $pageSize) {
    id
    name
    yearlyGrossIncome {
      amount: valueInCents
      currency
    }
    yearlyNetIncome {
      amount: valueInCents
      currency
    }
    yearlyIncomeDiscount {
      amount: valueInCents
      currency
    }
  }
}
`;

interface IncomeResumes {
	incomeResumes: IncomeResume[];
}

const IncomeList: React.FC<RouteComponentProps> = () => {
	const classes = useStyles();

	const { loading, data: incomeData } = useQuery<IncomeResumes>(GET_FINANCIAL_CONTRACTS_QUERY, {
		variables: {
			page: 1,
			pageSize: 100,
		},
	});

	const [ incomeResumes, setIncomeResumes ] = useState<IncomeResume[]>([]);

	useEffect(() => {
		if(incomeData && incomeData.incomeResumes) {
			setIncomeResumes(incomeData.incomeResumes);
		}
	}, [incomeData]);

	const removeResume = (id: string) => {
		setIncomeResumes(incomeResumes.filter(i => i.id !== id));
	};

	if (loading) {
		return (<Typography> Loading ... </Typography>);
	}

	return (
		<AuthenticatedPage>
			<Grid container spacing={3}>
				<Grid container>
					<Grid item xs={10}>
						<Typography variant={"h4"}>Incomes</Typography>
					</Grid>
					<Grid item xs={2}>
						<Link underline={'none'} href="/incomes/new" color={"textSecondary"}>
							<Button
								variant="contained"
								color="primary"
								size="small"
								className={classes.button}
								startIcon={<AddIcon />}
							>
								Add Income
							</Button>
						</Link>
					</Grid>
				</Grid>

				<Grid item xs={12}>
					<TableContainer component={Paper}>
						<Table className={classes.cover} aria-label="spanning table">
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell>Yearly Gross Amount</TableCell>
									<TableCell>Yearly Net Amount</TableCell>
									<TableCell>Yearly Discounts</TableCell>
									<TableCell></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{incomeResumes.map(incomeResume => {
									return (
										<TableRow key={incomeResume.id}>
											<TableCell>{incomeResume.name}</TableCell>
											<TableCell>
												{Dinero(incomeResume.yearlyGrossIncome).toFormat() }
											</TableCell>
											<TableCell>
												{Dinero(incomeResume.yearlyNetIncome).toFormat() }
											</TableCell>
											<TableCell>
												{Dinero(incomeResume.yearlyIncomeDiscount).toFormat() }
											</TableCell>
											<TableCell>
												<ListItemMenu id={incomeResume.id} removeResume={removeResume} />
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>

				<Grid item xs={12}>
					<IncomeProjectionChart />
				</Grid>
			</Grid>
		</AuthenticatedPage>
	);
};

export default IncomeList;
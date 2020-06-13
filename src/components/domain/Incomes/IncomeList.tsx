import React, {useEffect, useState} from 'react';
import { RouteComponentProps } from '@reach/router';
import {Button, createStyles, Grid, Link, Theme, Typography} from "@material-ui/core";
import AuthenticatedPage from "../AuthenticatedPage";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AddIcon from '@material-ui/icons/Add';
import {IncomeResume} from "./types";
import { getIncomeResumes } from "../../../clients/publicApiClient";
import Dinero from "dinero.js";

const useStyles = makeStyles((theme: Theme) => createStyles({
		table: {
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


const IncomeList: React.FC<RouteComponentProps> = () => {
	const classes = useStyles();

	const [incomeResumes, setIncomeResumes] = useState<IncomeResume[]>([]);

	useEffect(() => {
		getIncomeResumes(1, 20)
			.then((financialContracts: IncomeResume[]) => {
				setIncomeResumes(financialContracts);
			});
	});

	return (
		<AuthenticatedPage>
			<Grid container spacing={3}>
				<Grid container>
					<Grid item xs={10}>
						<Typography variant={"h4"}>Contratos e Proventos</Typography>
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
								Adicionar Provento
							</Button>
						</Link>
					</Grid>
				</Grid>

				<Grid item xs={12}>
					<TableContainer component={Paper}>
						<Table className={classes.table} aria-label="spanning table">
							<TableHead>
								<TableRow>
									<TableCell>Nome</TableCell>
									<TableCell>Bruto Anual</TableCell>
									<TableCell>Líquido Anual</TableCell>
									<TableCell>Desconto Anual</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{incomeResumes.map(incomeResume => (
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
									</TableRow>)
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			</Grid>
		</AuthenticatedPage>
	);
};

export default IncomeList;
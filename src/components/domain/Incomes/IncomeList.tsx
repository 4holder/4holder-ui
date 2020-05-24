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
import {FinancialContract} from "./types";
import { getFinancialContracts } from "../../../clients/publicApiClient";
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

	const [financialContracts, setFinancialContracts] = useState<FinancialContract[]>([]);

	useEffect(() => {
		getFinancialContracts(1, 20)
			.then((financialContracts: FinancialContract[]) => {
				setFinancialContracts(financialContracts);
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
									<TableCell>Contrato</TableCell>
									<TableCell>Tipo</TableCell>
									<TableCell>Bruto Mensal</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{financialContracts.map(financialContract => (
									<TableRow key={financialContract.id}>
										<TableCell>{financialContract.name}</TableCell>
										<TableCell>{financialContract.contractType}</TableCell>
										<TableCell>
											{Dinero(financialContract.grossAmount).toFormat() }
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
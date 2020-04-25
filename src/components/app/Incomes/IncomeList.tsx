import React from 'react';
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

	return (
		<AuthenticatedPage>
			<Grid container spacing={3}>
				<Grid container>
					<Grid item xs={10}>
						<Typography variant={"h4"}>Lista de Proventos</Typography>
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
									<TableCell>Provento</TableCell>
									<TableCell>Tipo</TableCell>
									<TableCell>Bruto</TableCell>
									<TableCell>Descontos</TableCell>
									<TableCell>Líquido</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow key="Salário">
									<TableCell>Salário Empresa X</TableCell>
									<TableCell>Salary</TableCell>
									<TableCell>R$2800,00</TableCell>
									<TableCell>R$459,13</TableCell>
									<TableCell>R$2.340,87</TableCell>
								</TableRow>
								<TableRow>
									<TableCell rowSpan={3} />
									<TableCell colSpan={1}>Subtotal</TableCell>
									<TableCell>R$2800,00</TableCell>
									<TableCell>R$459,13</TableCell>
									<TableCell>R$2.340,87</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			</Grid>
		</AuthenticatedPage>
	);
};

export default IncomeList;
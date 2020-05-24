import React, {useEffect, useState} from 'react';
import { RouteComponentProps } from '@reach/router';
import {
	Button,
	createStyles,
	Grid,
	TextField,
	Theme,
	Typography,
} from "@material-ui/core";
import AuthenticatedPage from "../AuthenticatedPage";
import { makeStyles } from '@material-ui/core/styles';
import { calculateBaseCLTContract } from "../../../clients/publicApiClient";
import Dinero, {Currency} from "dinero.js";
import MoneyFormat from "../../common/NumberFormat/MoneyFormat";
import IncomeForm from "./Forms/IncomeForm";
import {Amount, Discount, Income} from "./types";
import { sanitizeValue } from "./utils";

const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
	})
);

interface FormValues {
	incomes: Income[];
}

export interface Contract {
	grossSalary: Amount;
	incomes: Income[];
}

export interface CLTBaseForm {
	grossSalary: string;
	dependentsQuantity: number;
	deductions: string;
}

const NewFinancialContract: React.FC<RouteComponentProps> = () => {
	const classes = useStyles();
	const [ cltBaseFormValues, setCLTBaseFormValues] = useState<CLTBaseForm>({
		grossSalary: '200000',
		dependentsQuantity: 0,
		deductions: '0',
	});

	const [formValues, setFormValues] = useState<FormValues>({
		incomes: [],
	});

	const updateBaseCLTContract = () => {
		calculateBaseCLTContract(
			parseInt(cltBaseFormValues.grossSalary),
			parseInt(cltBaseFormValues.dependentsQuantity.toString()),
			parseInt(cltBaseFormValues.deductions),
		).then((response: Contract) => {
			setFormValues({
				...formValues,
				incomes: [],
			});

			setFormValues({
				...formValues,
				incomes: response.incomes,
			});
		});
	};

	useEffect(() => {
		updateBaseCLTContract();
	}, [cltBaseFormValues]);

	const handleBaseCLTChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = sanitizeValue(event.target.value) || 0;

		setCLTBaseFormValues({
			...cltBaseFormValues,
			[event.target.name]: value,
		});
	};

	return (
		<AuthenticatedPage>
			<form className={classes.root} noValidate autoComplete="off">
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Typography variant={"h4"}>Adicionar Proventos</Typography>
					</Grid>
					<Grid item xs={12}>

					</Grid>
					<Grid item xs={12}>
						<TextField
							id="standard-select-currency-native"
							select
							label="Tipo de Provento"
							value="CLT"
							SelectProps={{
								native: true,
							}}
						>
							<option key="CLT" value="CLT">CLT</option>
						</TextField>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Salário Bruto"
							value={
								Dinero({ amount: parseInt(cltBaseFormValues.grossSalary) })
								.toRoundedUnit(2).toFixed(2)
							}
							onChange={handleBaseCLTChange}
							name="grossSalary"
							InputProps={{
								inputComponent: MoneyFormat as any,
							}}
							variant="outlined"
						/>
						<TextField
							id="outlined-number"
							label="Dependentes"
							type="number"
							variant="outlined"
							value={cltBaseFormValues.dependentsQuantity}
							name="dependentsQuantity"
							onChange={handleBaseCLTChange}
						/>
						<TextField
							id="outlined-search"
							label="Deduções"
							variant="outlined"
							value={
								Dinero({ amount: parseInt(cltBaseFormValues.deductions) })
									.toRoundedUnit(2).toFixed(2)}
							name="deductions"
							onChange={handleBaseCLTChange}
							InputProps={{
								inputComponent: MoneyFormat as any,
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						{ formValues.incomes.map((income, i) => (
							<IncomeForm key={i}
													fieldKey={i}
													income={income}
													handleChange={() => null}
							/>))
						}
						<hr />
						<Button color={"default"}
										variant={"outlined"}
										style={{
											margin: '8px',
										}}
										onClick={e => {
											e.preventDefault();
											const newIncome = {
												name: 'Other',
												incomeType: 'OTHER',
												occurrences: {
													day: 5,
													months: [1],
												},
												amount: {
													amount: 0,
													currency: 'BRL' as Currency,
												},
												discounts: [] as Discount[],
											};

											setFormValues({
												...formValues,
												incomes: [...formValues.incomes, ...[newIncome]],
											});
										}}>
							Adicionar Provento
						</Button>
						<Button color={"default"}
										variant={"outlined"}
										style={{
											margin: '8px',
										}}
										onClick={e => {
											e.preventDefault();
											const lastIncomeIndex = formValues.incomes.length-1;
											setFormValues({
												...formValues,
												incomes: formValues.incomes.filter((_, i) => i !== lastIncomeIndex),
											});
										}}
						>
							Remover Último Provento
						</Button>
						<hr />
						<Button variant="contained"
										color="primary"
										fullWidth>
							Salvar
						</Button>
					</Grid>
				</Grid>
			</form>
		</AuthenticatedPage>
	);
};

export default NewFinancialContract;

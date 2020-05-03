import React, {useEffect, useState} from 'react';
import { RouteComponentProps } from '@reach/router';
import {
	createStyles,
	Grid,
	TextField,
	Theme,
	Typography,
} from "@material-ui/core";
import AuthenticatedPage from "../AuthenticatedPage";
import { makeStyles } from '@material-ui/core/styles';
import { calculateBaseCLTContract } from "../../../clients/publicApiClient";
import Dinero, { Currency } from "dinero.js";
import MoneyFormat from "../../common/NumberFormat/MoneyFormat";
import IncomeForm from "./Forms/IncomeForm";
import {Amount, Discount} from "./types";
import {sanitizeValue} from "./utils";

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

export interface Income {
	name: string;
	occurrences: {
		day: number;
		months: number[];
	};
	amount: Amount;
	discounts: Discount[];
}

export interface Contract {
	netSalary: Income;
	thirteenthSalary: Income;
	thirteenthSalaryAdvance: Income;
}

export interface CLTBaseForm {
	grossSalary: string;
	dependentsQuantity: number;
	deductions: string;
}

const NewIncome: React.FC<RouteComponentProps> = () => {
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
				incomes: [
					response.netSalary,
					response.thirteenthSalaryAdvance,
					response.thirteenthSalary,
				],
			});
		});
	};

	useEffect(() => updateBaseCLTContract(), [cltBaseFormValues]);

	const handleBaseCLTChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = sanitizeValue(event.target.value) || 0;

		setCLTBaseFormValues({
			...cltBaseFormValues,
			[event.target.name]: value,
		});
	};

	function updateIncome(newIncome: Income, index: number) {
		const newIncomes = formValues.incomes.map((income, i) => i === index ? newIncome : income);

		const newFormValues = {
			...formValues,
			incomes: newIncomes,
		} as FormValues;

		setFormValues(newFormValues);
	}

	const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = sanitizeValue(event.target.value) || 0;
		const index = parseInt(event.target.name);

		const updatedIncome = {
			...formValues.incomes[index],
			amount: {
				...formValues.incomes[index].amount,
				amount: value,
			},
		} as Income;

		updateIncome(updatedIncome, index);
	};

	const handleOccurrencesDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const day = parseInt(event.target.value) || 0;
		const index = parseInt(event.target.name.replace(/[a-zA-Z_]/g, ''));

		const updatedIncome = {
			...formValues.incomes[index],
			occurrences: {
				...formValues.incomes[index].occurrences,
				day: day,
			},
		} as Income;

		updateIncome(updatedIncome, index);
	};

	const handleOccurrencesMonthsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const day = parseInt(event.target.value) || 0;
		const index = parseInt(event.target.name.replace(/[a-zA-Z_]/g, ''));

		const updatedIncome = {
			...formValues.incomes[index],
			occurrences: {
				...formValues.incomes[index].occurrences,
				day: day,
			},
		} as Income;

		updateIncome(updatedIncome, index);
	};

	return (
		<AuthenticatedPage>
			<form className={classes.root} noValidate autoComplete="off">
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Typography variant={"h4"}>Adicionar Proventos</Typography>
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
							helperText="Tipo de Provento. Ex.: CLT"
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

					{ formValues.incomes.map((income, i) => (
						<IncomeForm key={i}
												fieldKey={i}
												income={income}
												handleChange={() => null}
						/>
						))}
				</Grid>
			</form>
		</AuthenticatedPage>
	);
};

export default NewIncome;
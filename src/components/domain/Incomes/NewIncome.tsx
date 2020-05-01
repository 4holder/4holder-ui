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

export interface Amount {
	amount: number;
	currency: Currency;
}

export interface Discount {
	amount: Amount;
	discountType: string;
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

function sanitizeValue(value: string) {
	return parseInt(value.replace('.', ''));
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
			console.log(response.netSalary.occurrences);
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

	useEffect(() => updateBaseCLTContract(),
		[cltBaseFormValues]);

	const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = sanitizeValue(event.target.value) || 0;

		setCLTBaseFormValues({
			...cltBaseFormValues,
			[event.target.name]: value,
		});
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = sanitizeValue(event.target.value) || 0;
		const index = parseInt(event.target.name);

		const newIncome = {
			...formValues.incomes[index],
			amount: {
				...formValues.incomes[index].amount,
				amount: value,
			},
		} as Income;

		const newIncomes = formValues.incomes.map((income, i) => i === index? newIncome : income);

		const newFormValues = {
			...formValues,
			incomes: newIncomes,
		} as FormValues;

		setFormValues(newFormValues);
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
							onChange={handleAmountChange}
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
							onChange={handleAmountChange}
						/>
						<TextField
							id="outlined-search"
							label="Deduções"
							variant="outlined"
							value={
								Dinero({ amount: parseInt(cltBaseFormValues.deductions) })
									.toRoundedUnit(2).toFixed(2)}
							name="deductions"
							onChange={handleAmountChange}
							InputProps={{
								inputComponent: MoneyFormat as any,
							}}
						/>
					</Grid>

					{ formValues.incomes.map((income, i) => (
						<IncomeForm fieldKey={i}
												income={income}
												handleChange={handleChange}
						/>
						))}
				</Grid>
			</form>
		</AuthenticatedPage>
	);
};

export default NewIncome;
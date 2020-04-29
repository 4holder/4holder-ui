import React from 'react';
import { RouteComponentProps } from '@reach/router';
import {
	createStyles,
	Grid, List,
	ListItemSecondaryAction,
	TextField,
	Theme,
	Typography,
	IconButton,
	ListItem,
} from "@material-ui/core";
import AuthenticatedPage from "../AuthenticatedPage";
import { makeStyles } from '@material-ui/core/styles';
import { calculateBaseCLTContract } from "../../../clients/publicApiClient";
import Dinero, { Currency } from "dinero.js";
import SyncIcon from '@material-ui/icons/Sync';
import DeleteIcon from '@material-ui/icons/Delete';
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

interface State {
	grossSalary: string;
	dependentsQuantity: number;
	deductions: string;
	netSalary: string;
	thirteenthSalary: string;
	thirteenthSalaryAdvance: string;
}

export interface Amount {
	amount: number;
	currency: Currency;
}

export interface Discount {
	amount: Amount;
	discountType: string;
}

interface Income {
	name: string;
	amount: Amount;
	discounts: Discount[];
}

interface Contract {
	netSalary: Income;
	thirteenthSalary: Income;
	thirteenthSalaryAdvance: Income;
}

const NewIncome: React.FC<RouteComponentProps> = () => {
	const classes = useStyles();
	const [formValues, setFormValues] = React.useState<State>({
		grossSalary: '0',
		dependentsQuantity: 0,
		deductions: '0',
		netSalary: '0',
		thirteenthSalary: '0',
		thirteenthSalaryAdvance: '0',
	});

	const defaultIncome = {
		name: '',
		amount: {
			amount: 0,
			currency: 'BRL' as Currency,
		},
		discounts: [],
	};

	const [ contract, setContract ] = React.useState<Contract>({
		netSalary: { ...defaultIncome, name: 'Salário Líquido' },
		thirteenthSalary: { ...defaultIncome, name: 'Décimo Terceiro' },
		thirteenthSalaryAdvance: { ...defaultIncome, name: 'Adiantamento do Décimo Terceiro' },
	});

	const updateBaseCLTContract = () => {
		calculateBaseCLTContract(
			parseInt(formValues.grossSalary),
			parseInt(formValues.dependentsQuantity.toString()),
			parseInt(formValues.deductions),
		).then((response: Contract) => {
			setContract(response);

			setFormValues({
				...formValues,
				netSalary: response.netSalary.amount.amount.toString(),
				thirteenthSalary: response.thirteenthSalary.amount.amount.toString(),
				thirteenthSalaryAdvance: response.thirteenthSalaryAdvance.amount.amount.toString(),
			});
		});
	};

	const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value.replace('.', '') || 0;

		setFormValues({
			...formValues,
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
								Dinero({ amount: parseInt(formValues.grossSalary) })
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
							value={formValues.dependentsQuantity}
							name="dependentsQuantity"
							onChange={handleAmountChange}
						/>
						<TextField
							id="outlined-search"
							label="Deduções"
							variant="outlined"
							value={
								Dinero({ amount: parseInt(formValues.deductions) })
									.toRoundedUnit(2).toFixed(2)}
							name="deductions"
							onChange={handleAmountChange}
							InputProps={{
								inputComponent: MoneyFormat as any,
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<IconButton
							onClick={updateBaseCLTContract}
							size={"small"}
							color="primary"
							aria-label="Atualizar valores">
							<SyncIcon /> Recalcular Valores
						</IconButton>
					</Grid>

					<IncomeForm fieldKey="netSalary"
											incomeName={contract.netSalary.name}
											incomeValue={formValues.netSalary}
											handleChange={handleAmountChange}
											discounts={contract.netSalary.discounts.map(d => ({
													amount: d.amount.amount.toString(),
													discountType: d.discountType,
												})
											)}
					/>

					<IncomeForm fieldKey="thirteenthSalary"
											incomeName={contract.thirteenthSalary.name}
											incomeValue={formValues.thirteenthSalary}
											handleChange={handleAmountChange}
											discounts={contract.thirteenthSalary.discounts.map(d => ({
													amount: d.amount.amount.toString(),
													discountType: d.discountType,
												})
											)}
					/>

					<IncomeForm fieldKey="thirteenthSalaryAdvance"
											incomeName={contract.thirteenthSalaryAdvance.name}
											incomeValue={formValues.thirteenthSalaryAdvance}
											handleChange={handleAmountChange}
											discounts={contract.thirteenthSalaryAdvance.discounts.map(d => ({
													amount: d.amount.amount.toString(),
													discountType: d.discountType,
												})
											)}
					/>

					{/*<Grid item xs={12}>*/}
					{/*	<Typography variant={"subtitle2"}>Adiantamento do 13º Salário</Typography>*/}
					{/*</Grid>*/}
					{/*<Grid item xs={12}>*/}
					{/*	<TextField*/}
					{/*		id="outlined-search"*/}
					{/*		label="Adiantamento do 13º"*/}
					{/*		variant="outlined"*/}
					{/*		value={contract ?*/}
					{/*			Dinero(contract.thirteenthSalaryAdvance.amount)*/}
					{/*				.toRoundedUnit(2).toFixed(2) :*/}
					{/*			'0' }*/}
					{/*		name="thirteenthSalaryAdvance"*/}
					{/*		onChange={handleAmountChange}*/}
					{/*		InputProps={{*/}
					{/*			inputComponent: MoneyFormat as any,*/}
					{/*		}}*/}
					{/*	/>*/}
					{/*</Grid>*/}
					{/*<Grid item xs={12}>*/}
					{/*	<Typography variant={"subtitle2"}>13º Salário</Typography>*/}
					{/*</Grid>*/}
					{/*<Grid item xs={12}>*/}
					{/*	<TextField*/}
					{/*		id="outlined-search"*/}
					{/*		label="Adiantamento do 13º"*/}
					{/*		variant="outlined"*/}
					{/*		value={contract ?*/}
					{/*			Dinero(contract.thirteenthSalary.amount)*/}
					{/*				.toRoundedUnit(2).toFixed(2) :*/}
					{/*			'0' }*/}
					{/*		name="thirteenthSalaryAdvance"*/}
					{/*		onChange={handleAmountChange}*/}
					{/*		InputProps={{*/}
					{/*			inputComponent: MoneyFormat as any,*/}
					{/*		}}*/}
					{/*	/>*/}
					{/*</Grid>*/}
					{/*<Grid item xs={2}>*/}
					{/*	<Typography variant={"caption"}>Descontos</Typography>*/}
					{/*	<List>*/}
					{/*		{ contract ?*/}
					{/*			contract.thirteenthSalary.discounts.map(discount => {*/}
					{/*				return (*/}
					{/*					<ListItem>*/}
					{/*						<TextField*/}
					{/*							label={discount.discountType}*/}
					{/*							variant="outlined"*/}
					{/*							value={contract ?*/}
					{/*								Dinero(discount.amount)*/}
					{/*									.toRoundedUnit(2).toFixed(2) :*/}
					{/*								'0' }*/}
					{/*							name="discount"*/}
					{/*							onChange={handleAmountChange}*/}
					{/*							InputProps={{*/}
					{/*								inputComponent: MoneyFormat as any,*/}
					{/*							}}*/}
					{/*						/>*/}
					{/*						<ListItemSecondaryAction>*/}
					{/*							<IconButton edge="end" aria-label="delete">*/}
					{/*								<DeleteIcon />*/}
					{/*							</IconButton>*/}
					{/*						</ListItemSecondaryAction>*/}
					{/*					</ListItem>*/}
					{/*				);*/}
					{/*			})*/}
					{/*			: null*/}
					{/*		}*/}
					{/*	</List>*/}
					{/*</Grid>*/}
				</Grid>
			</form>
		</AuthenticatedPage>
	);
};

export default NewIncome;
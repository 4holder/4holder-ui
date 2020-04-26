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
import NumberFormat from 'react-number-format';
import { calculateBaseCLTContract } from "../../../clients/publicApiClient";
import Dinero, { Currency } from "dinero.js";
import SyncIcon from '@material-ui/icons/Sync';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
	})
);

interface NumberFormatCustomProps {
	inputRef: (instance: NumberFormat | null) => void;
	onChange: (event: { target: { name: string; value: string } }) => void;
	name: string;
}

function NumberFormatCustom(props: NumberFormatCustomProps) {
	const { inputRef, onChange, ...other } = props;

	return (
		<NumberFormat
			{...other}
			getInputRef={inputRef}
			onValueChange={(values) => {
				onChange({
					target: {
						name: props.name,
						value: values.value,
					},
				});
			}}
			thousandSeparator="."
			decimalSeparator=","
			decimalScale={2}
			isNumericString
			prefix="R$"
		/>
	);
}

interface State {
	grossSalary: string;
	dependentsQuantity: number;
	deductions: string;
	netSalary: string;
}

interface Amount {
	amount: number;
	currency: Currency;
}

interface Discount {
	amount: Amount;
	discountType: string;
}

interface Income {
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
	const [values, setValues] = React.useState<State>({
		grossSalary: '0',
		dependentsQuantity: 0,
		deductions: '0',
		netSalary: '0',
	});

	const defaultIncome = {
		amount: {
			amount: 0,
			currency: 'BRL' as Currency,
		},
		discounts: [],
	};
	const [ contract, setContract ] = React.useState<Contract>({
		netSalary: defaultIncome,
		thirteenthSalary: defaultIncome,
		thirteenthSalaryAdvance: defaultIncome,
	});

	const updateBaseCLTContract = () => {
		calculateBaseCLTContract(
			parseInt(values.grossSalary),
			parseInt(values.dependentsQuantity.toString()),
			parseInt(values.deductions),
		).then(response => {
			setContract(response)
		});
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value.replace('.', '') || 0;

		setValues({
			...values,
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
								Dinero({ amount: parseInt(values.grossSalary) })
								.toRoundedUnit(2).toFixed(2)
							}
							onChange={handleChange}
							name="grossSalary"
							InputProps={{
								inputComponent: NumberFormatCustom as any,
							}}
							variant="outlined"
						/>
						<TextField
							id="outlined-number"
							label="Dependentes"
							type="number"
							variant="outlined"
							value={values.dependentsQuantity}
							name="dependentsQuantity"
							onChange={handleChange}
						/>
						<TextField
							id="outlined-search"
							label="Deduções"
							variant="outlined"
							value={
								Dinero({ amount: parseInt(values.deductions) })
									.toRoundedUnit(2).toFixed(2)}
							name="deductions"
							onChange={handleChange}
							InputProps={{
								inputComponent: NumberFormatCustom as any,
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
					<Grid item xs={12}>
						<Typography variant={"subtitle2"}>Salário Líquido</Typography>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="outlined-search"
							label="Salário Líquido"
							variant="outlined"
							value={contract ?
								Dinero(contract.netSalary.amount)
									.toRoundedUnit(2).toFixed(2) :
								'0' }
							name="netSalary"
							onChange={handleChange}
							InputProps={{
								inputComponent: NumberFormatCustom as any,
							}}
						/>
					</Grid>
					<Grid item xs={2}>
						<Typography variant={"caption"}>Descontos</Typography>
						<List>
							{ contract ?
								contract.netSalary.discounts.map(discount => {
									return (
										<ListItem>
											<TextField
												label={discount.discountType}
												variant="outlined"
												value={contract ?
													Dinero(discount.amount)
														.toRoundedUnit(2).toFixed(2) :
													'0' }
												name="discount"
												onChange={handleChange}
												InputProps={{
													inputComponent: NumberFormatCustom as any,
												}}
											/>
											<ListItemSecondaryAction>
												<IconButton edge="end" aria-label="delete">
													<DeleteIcon />
												</IconButton>
											</ListItemSecondaryAction>
										</ListItem>
									);
								})
								: null
							}
						</List>
					</Grid>
					<Grid item xs={12}>
						<Typography variant={"subtitle2"}>Adiantamento do 13º Salário</Typography>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="outlined-search"
							label="Adiantamento do 13º"
							variant="outlined"
							value={contract ?
								Dinero(contract.thirteenthSalaryAdvance.amount)
									.toRoundedUnit(2).toFixed(2) :
								'0' }
							name="thirteenthSalaryAdvance"
							onChange={handleChange}
							InputProps={{
								inputComponent: NumberFormatCustom as any,
							}}
						/>
					</Grid>
					<Grid item xs={12}>
						<Typography variant={"subtitle2"}>13º Salário</Typography>
					</Grid>
					<Grid item xs={12}>
						<TextField
							id="outlined-search"
							label="Adiantamento do 13º"
							variant="outlined"
							value={contract ?
								Dinero(contract.thirteenthSalary.amount)
									.toRoundedUnit(2).toFixed(2) :
								'0' }
							name="thirteenthSalaryAdvance"
							onChange={handleChange}
							InputProps={{
								inputComponent: NumberFormatCustom as any,
							}}
						/>
					</Grid>
					<Grid item xs={2}>
						<Typography variant={"caption"}>Descontos</Typography>
						<List>
							{ contract ?
								contract.thirteenthSalary.discounts.map(discount => {
									return (
										<ListItem>
											<TextField
												label={discount.discountType}
												variant="outlined"
												value={contract ?
													Dinero(discount.amount)
														.toRoundedUnit(2).toFixed(2) :
													'0' }
												name="discount"
												onChange={handleChange}
												InputProps={{
													inputComponent: NumberFormatCustom as any,
												}}
											/>
											<ListItemSecondaryAction>
												<IconButton edge="end" aria-label="delete">
													<DeleteIcon />
												</IconButton>
											</ListItemSecondaryAction>
										</ListItem>
									);
								})
								: null
							}
						</List>
					</Grid>
				</Grid>
			</form>
		</AuthenticatedPage>
	);
};

export default NewIncome;
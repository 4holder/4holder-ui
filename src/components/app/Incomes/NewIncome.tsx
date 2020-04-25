import React, {useEffect} from 'react';
import { RouteComponentProps } from '@reach/router';
import { createStyles,
	Grid,
	TextField,
	Theme,
	Typography
} from "@material-ui/core";
import AuthenticatedPage from "../AuthenticatedPage";
import { makeStyles } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';
import { calculateBaseCLTContract } from "../../../clients/publicApiClient";
import Dinero, { Currency } from "dinero.js";

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

interface Contract {
	netSalary: {
		amount: {
			amount: number;
			currency: Currency;
		}
	};
}

const NewIncome: React.FC<RouteComponentProps> = () => {
	const classes = useStyles();
	const [values, setValues] = React.useState<State>({
		grossSalary: '1100000',
		dependentsQuantity: 1,
		deductions: '0',
		netSalary: '0',
	});
	const [ contract, setContract ] = React.useState<Contract>({
		netSalary: {
			amount: {
				amount: 0,
				currency: 'BRL',
			},
		}
	});

	useEffect( () => {
		calculateBaseCLTContract(
			parseInt(values.grossSalary),
			values.dependentsQuantity,
			parseInt(values.deductions),
		).then(response => {
			setContract(response)
		});
	});

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValues({
			...values,
			[event.target.name]: event.target.value,
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
						<TextField
							id="outlined-search"
							label="Salário Liquido"
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
				</Grid>
			</form>
		</AuthenticatedPage>
	);
};

export default NewIncome;
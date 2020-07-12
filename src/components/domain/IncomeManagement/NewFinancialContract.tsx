import React from 'react';
import {navigate, RouteComponentProps} from '@reach/router';
import {Button, createStyles, Grid, Step, StepLabel, Stepper, Theme, Typography,} from "@material-ui/core";
import { useMutation } from "@apollo/react-hooks";
import AuthenticatedPage from "../AuthenticatedPage";
import {makeStyles} from '@material-ui/core/styles';
import ContractForm from "./Forms/ContractForm";
import IncomeForm from "./Forms/IncomeForm";
import Review from "./Forms/Review";
import {ContractType, DiscountType, IncomeType} from "./types";
import {gql} from "apollo-boost";

const useStyles = makeStyles((theme: Theme) => createStyles({
	cardRoot: {
		'& .MuiTextField-root': {
			margin: theme.spacing(1),
			width: '25ch',
		},
	},
	backButton: {
		marginRight: theme.spacing(1),
	},
	instructions: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	})
);

type IncomeContentTypes = string | Date | NewIncomeForm[];

function getStepContent(
	stepIndex: Number,
	formData: NewFinancialContractForm,
	handleFormData: (key: string, value: IncomeContentTypes) => void,
	handleIncomeInputDataChange: (index: number, key: string, value: string) => void,
	handleDiscountInputDataChange: (incomeIndex: number, discountIndex: number, key: string, value: string) => void,
	handleRemoveIncome: (index: number) => void,
	handleRemoveIncomeDiscount: (ii: number, di: number) => void,
	handleAddIncome: () => void,
	handleAddDiscountIncome: (incomeIndex: number) => void,
) {
	switch (stepIndex) {
		case 0:
			return <ContractForm inputData={formData} handleInputDataChange={handleFormData}/>;
		case 1:
			return <IncomeForm
				inputData={formData}
				handleInputDataChange={handleFormData}
				handleIncomeInputDataChange={handleIncomeInputDataChange}
				handleDiscountInputDataChange={handleDiscountInputDataChange}
				handleRemoveIncome={handleRemoveIncome}
				handleRemoveIncomeDiscount={handleRemoveIncomeDiscount}
				handleAddIncome={handleAddIncome}
				handleAddDiscountIncome={handleAddDiscountIncome}
			/>;
		case 2:
			return <Review formData={formData} />;
	}
}

export interface NewIncomeDiscountForm {
	name: string;
	amount: number;
	discountType: DiscountType;
}

export interface NewIncomeForm {
	name: string;
	amount: number;
	incomeType: IncomeType;
	occurrencesDay: number;
	occurrencesMonths: number[];
	discounts: NewIncomeDiscountForm[];
}

export interface NewFinancialContractForm {
	name: string;
	contractType: ContractType;
	companyCnpj?: string;
	startDate: Date;
	endDate?: Date;
	incomes: NewIncomeForm[];
	grossSalary: number;
	dependentsQuantity: number;
	deductions: number;
}

export const ADD_INCOME = gql`
mutation RegisterNewFinancialContract($input: NewFinancialContractInput!) {
	registerNewFinancialContract(input: $input) {
		id
	}
}
`;

function mapToContractRegisterInput(formData: NewFinancialContractForm) {
	return {
		name: formData.name,
		contractType: formData.contractType,
		companyCnpj: formData.companyCnpj,
		startDate: formData.startDate,
		endDate: formData.endDate,
		incomes: formData.incomes.map(income => ({
			name: income.name,
			incomeType: income.incomeType,
			amount: {
				valueInCents: parseInt((income.amount * 100).toString()),
				currency: "BRL",
			},
			occurrences: {
				day: income.occurrencesDay,
				months: income.occurrencesMonths,
			},
			discounts: income.discounts.map(discount => ({
				name: discount.name,
				discountType: discount.discountType,
				amount: {
					valueInCents: parseInt((discount.amount * 100).toString()),
					currency: "BRL",
				},
			})),
		})),
	};
}

const NewFinancialContract: React.FC<RouteComponentProps> = () => {
	const [ registerNewFinancialContract ] = useMutation(ADD_INCOME);
	const classes = useStyles();

	const [formData, setFormData] = React.useState<NewFinancialContractForm>({
		contractType: ContractType.CLT,
		companyCnpj: "00000000000000",
		name: "A Co. Company",
		startDate: new Date(),
		incomes: [],
		grossSalary: 14999.99,
		dependentsQuantity: 0,
		deductions: 0,
	});

	const [activeStep, setActiveStep] = React.useState(0);
	const steps = [
		'Contract Information',
		'Incomes & Discounts',
		'Review and Confirm',
	];

	const handleNext = () => {
		if (activeStep === 2) {
			registerNewFinancialContract({
				variables: {
					input: mapToContractRegisterInput(formData),
				}
			}).then(_ => navigate("/incomes"));
		} else {
			setActiveStep((prevActiveStep) => prevActiveStep + 1);
		}
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	const handleFormDataChange = (key: string, value: IncomeContentTypes) => {
		setFormData({
			...formData,
			[key]: value,
		});
	};

	const handleIncomeInputDataChange = (index: number, key: string, value: any) => {
		const updatedIncome = {
			...formData.incomes[index],
			[key]: value,
		};

		setFormData({
			...formData,
			incomes: formData.incomes.map((income, i) => i === index? updatedIncome : income)
		})
	};

	const handleIncomeDiscountInputDataChange = (incomeIndex: number, discountIndex: number, key: string, value: any) => {
		const updatedDiscount = {
			...formData.incomes[incomeIndex].discounts[discountIndex],
			[key]: value,
		};

		setFormData({
			...formData,
			incomes: formData.incomes.map((income, ii) => ii === incomeIndex? {
				...income,
				discounts: income.discounts.map((discount, di) => di === discountIndex? updatedDiscount : discount)
			} : income)
		})
	};

	const handleRemoveIncome = (index: number) => {
		setFormData({
			...formData,
			incomes: formData.incomes.filter((_, i) => i !== index),
		});
	};

	const handleAddIncome = () => {
		const newIncome = {
			amount: 0,
			incomeType: IncomeType.SALARY,
			name: "",
			occurrencesDay: 5,
			occurrencesMonths: [],
			discounts: [],
		} as NewIncomeForm;

		setFormData({
			...formData,
			incomes: [
				...formData.incomes,
				newIncome,
			]
		})
	};

	const handleRemoveIncomeDiscount = (incomeIndex: number, discountIndex: number) => {
		const updatedIncome = {
			...formData.incomes[incomeIndex],
			discounts: formData.incomes[incomeIndex].discounts.filter((_, i) => i !== discountIndex),
		};

		setFormData({
			...formData,
			incomes: formData.incomes.map((income, i) => i === incomeIndex? updatedIncome : income),
		});
	};

	const handleAddDiscountIncome = (incomeIndex: number) => {
		const newIncomeDiscount = {
			amount: 0,
			discountType: DiscountType.OTHER,
			name: "",
		} as NewIncomeDiscountForm;

		const updatedIncome = {
			...formData.incomes[incomeIndex],
			discounts: [
				...formData.incomes[incomeIndex].discounts,
				newIncomeDiscount,
			]
		};

		setFormData({
			...formData,
			incomes: formData.incomes.map((income, i) => i === incomeIndex? updatedIncome : income),
		})
	};

	return (
		<AuthenticatedPage>
			<form className={classes.cardRoot} noValidate autoComplete="off">
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<Stepper activeStep={activeStep} alternativeLabel>
							{steps.map((label) => (
								<Step key={label}>
									<StepLabel>{label}</StepLabel>
								</Step>
							))}
						</Stepper>
					</Grid>
					<Grid item xs={12}>
						{activeStep === steps.length ? (
							<div>
								<Typography className={classes.instructions}>All steps completed</Typography>
								<Button onClick={handleReset}>Reset</Button>
							</div>
						) : (
							<div>
								<div className={classes.instructions}>
									{getStepContent(
										activeStep,
										formData,
										handleFormDataChange,
										handleIncomeInputDataChange,
										handleIncomeDiscountInputDataChange,
										handleRemoveIncome,
										handleRemoveIncomeDiscount,
										handleAddIncome,
										handleAddDiscountIncome,
									)}
								</div>
								<div>
									<Button
										disabled={activeStep === 0}
										onClick={handleBack}
										className={classes.backButton}
									>
										Back
									</Button>
									<Button variant="contained" color="primary" onClick={handleNext}>
										{activeStep === steps.length - 1 ? 'Finish' : 'Next'}
									</Button>
								</div>
							</div>
						)}
					</Grid>
				</Grid>
			</form>
		</AuthenticatedPage>
	);
};

export default NewFinancialContract;

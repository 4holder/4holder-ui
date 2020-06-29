import React from 'react';
import {RouteComponentProps} from '@reach/router';
import {Button, createStyles, Grid, Step, StepLabel, Stepper, Theme, Typography,} from "@material-ui/core";
import AuthenticatedPage from "../AuthenticatedPage";
import {makeStyles} from '@material-ui/core/styles';
import ContractForm from "./Forms/ContractForm";
import IncomeForm from "./Forms/IncomeForm";
import Review from "./Forms/Review";
import {ContractType, NewFinancialContractInput, NewIncomeInput} from "./types";

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

function getStepContent(
	stepIndex: Number,
	formData: NewFinancialContractInput,
	handleFormData: (key: string, value: string | Date | NewIncomeInput[]) => void,
) {
	switch (stepIndex) {
		case 0:
			return <ContractForm inputData={formData} handleInputDataChange={handleFormData}/>;
		case 1:
			return <IncomeForm inputData={formData} handleInputDataChange={handleFormData} />;
		case 2:
			return <Review />;
	}
}

const NewFinancialContract: React.FC<RouteComponentProps> = () => {
	const classes = useStyles();

	const [formData, setFormData] = React.useState<NewFinancialContractInput>({
		contractType: ContractType.CLT,
		name: "",
		startDate: new Date(),
		incomes: [],
		grossSalary: 0,
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
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	const handleFormDataChange = (key: string, value: string | Date | NewIncomeInput[]) => {
		setFormData({
			...formData,
			[key]: value,
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
									{getStepContent(activeStep, formData, handleFormDataChange)}
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

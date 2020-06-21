import React from 'react';
import {RouteComponentProps} from '@reach/router';
import {Button, createStyles, Grid, Step, StepLabel, Stepper, Theme, Typography,} from "@material-ui/core";
import AuthenticatedPage from "../AuthenticatedPage";
import {makeStyles} from '@material-ui/core/styles';
import {ClassNameMap} from "@material-ui/core/styles/withStyles";
import ContractForm from "./Forms/ContractForm";
import IncomeForm from "./Forms/IncomeForm";
import IncomeDiscountForm from "./Forms/IncomeDiscountForm";

const useStyles = makeStyles((theme: Theme) => createStyles({
	root: {
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

function getStepContent(stepIndex: Number, classes: ClassNameMap<string>) {
	switch (stepIndex) {
		case 0:
			return <ContractForm />;
		case 1:
			return <IncomeForm />;
	}
}

const NewFinancialContract: React.FC<RouteComponentProps> = () => {
	const classes = useStyles();

	const [activeStep, setActiveStep] = React.useState(2);
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

	return (
		<AuthenticatedPage>
			<form className={classes.root} noValidate autoComplete="off">
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
								<Typography className={classes.instructions}>{getStepContent(activeStep, classes)}</Typography>
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

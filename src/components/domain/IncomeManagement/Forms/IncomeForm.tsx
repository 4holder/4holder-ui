import React, {useEffect} from "react";
import {
  Button,
  createStyles,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import MoneyFormat from "../../../common/NumberFormat/MoneyFormat";
import {Amount, DiscountType, IncomeType, Occurrences} from "../types";
import {NewFinancialContractForm, NewIncomeForm} from "../NewFinancialContract";

const fieldWidth = 230;

const useStyles = makeStyles((theme: Theme) => createStyles({
  formControl: {
    margin: theme.spacing(1),
    minWidth: fieldWidth,
  },
  textField: {
    margin: theme.spacing(1),
    minWidth: fieldWidth,
  },
  selectField: {
    maxWidth: 206,
  },
  deleteButton: {
    margin: theme.spacing(2),
  },
  addButton: {
    margin: theme.spacing(2),
  },
  skeleton: {
    margin: theme.spacing(1),
    display: "inline-block",
    textAlign: "center",
    verticalAlign: "middle",
  },
  discounts: {
    marginLeft: 25,
    width: 830,
  },
}));

type HandleIncomeInputDataChange = (index: number, key: string, value: string) => void;

type EditableFieldEventTypes =
  React.ChangeEvent<{ name?: string; value: unknown; }>
  | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;

type HandleDiscountInputDataChange = (incomeIndex: number, discountIndex: number, key: string, value: string) => void;


const sanitizeMonetaryValue = (value: string | number) => {
  return parseInt(value.toString().replace(".", ""));
};

const sanitizeNumber = (value: number) => {
  return parseInt(value.toString());
};

interface CLTContract  {
  contract: {
    grossSalary: {
      amount: Amount;
    }
    incomes: {
      name: string;
      incomeType: IncomeType;
      occurrences: Occurrences;
      amount: Amount;
      discounts: {
        discountType: DiscountType;
        amount: Amount;
      }[];
    }[];
  };
}

export const CALCULATE_BASE_CLT_CONTRACT = gql`
query(
    $grossSalaryInCents: Int!, 
    $dependentsQuantity: Int!,
    $deductionsInCents: Int!) {
  contract: baseCLTContract(
    grossSalaryInCents: $grossSalaryInCents, 
    dependentsQuantity: $dependentsQuantity,
    deductionsInCents: $deductionsInCents
  ) {
    grossSalary {
      amount: valueInCents
    }
    incomes {
      name
      incomeType
      occurrences {
        day
        months
      }
      amount {
        amount: valueInCents
      }
      discounts {
        discountType
        amount {
          amount: valueInCents
        }
      }
    }
  }
}
`;

interface IncomeFormProps {
  inputData: NewFinancialContractForm;
  handleInputDataChange: (key: string, value: string | Date | NewIncomeForm[]) => void;
  handleIncomeInputDataChange: HandleIncomeInputDataChange;
  handleDiscountInputDataChange: HandleDiscountInputDataChange;
  handleRemoveIncome: (index: number) => void;
  handleRemoveIncomeDiscount: (ii: number, di: number) => void;
  handleAddIncome: () => void;
  handleAddDiscountIncome: (incomeIndex: number) => void;
}

const IncomeForm: React.FC<IncomeFormProps> = (props) => {
  const classes = useStyles();

  const { loading, data: contractData } = useQuery<CLTContract>(CALCULATE_BASE_CLT_CONTRACT, {
    variables: {
      grossSalaryInCents: sanitizeMonetaryValue(props.inputData.grossSalary),
      dependentsQuantity: sanitizeNumber(props.inputData.dependentsQuantity),
      deductionsInCents: sanitizeMonetaryValue(props.inputData.deductions),
    },
  });

  useEffect(() => {
    props.handleInputDataChange('incomes', contractData ? contractData.contract.incomes.map(income => ({
      name: income.name,
      amount: income.amount.amount/100,
      incomeType: income.incomeType,
      occurrencesDay: income.occurrences.day,
      occurrencesMonths: income.occurrences.months,
      discounts: income.discounts.map(discount => ({
        name: discount.discountType,
        amount: discount.amount.amount/100,
        discountType: discount.discountType,
      })),
    })) : []);
  }, [contractData]);

  const handleIncomeTextFieldChange = (index: number) => (e: EditableFieldEventTypes) => {
    const fieldName = e.target.name as string;
    const fieldValue = e.target.value as any;

    props.handleIncomeInputDataChange(index, fieldName, fieldValue);
  };

  const handleDiscountTextFieldChange = (incomeIndex: number, discountIndex: number) => (e: EditableFieldEventTypes) => {
    const fieldName = e.target.name as string;
    const fieldValue = e.target.value as any;

    props.handleDiscountInputDataChange(incomeIndex, discountIndex, fieldName, fieldValue);
  };

  if (loading) {
    return (<Typography>Loading..</Typography>);
  }

  return (
    <Grid container>
      <Paper>
        {props.inputData.incomes.map((income, ii) => {
          return (
            <div key={ii}>
              <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                  <InputLabel id="income-type-label">Income Type</InputLabel>
                  <Select
                    labelId="income-type-label"
                    name="incomeType"
                    label="Income Type"
                    value={income.incomeType}
                    onChange={handleIncomeTextFieldChange(ii)}
                  >
                    <MenuItem disabled value="">Income Type</MenuItem>
                    <MenuItem value="SALARY">Salary</MenuItem>
                    <MenuItem value="THIRTEENTH_SALARY">Thirteenth Salary</MenuItem>
                    <MenuItem value="THIRTEENTH_SALARY_ADVANCE">Thirteenth Salary Advance</MenuItem>
                    <MenuItem value="PROFIT_SHARING">Profit Sharing</MenuItem>
                    <MenuItem value="OTHER">Other</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Income Name"
                  className={classes.textField}
                  value={income.name}
                  name="name"
                  onChange={handleIncomeTextFieldChange(ii)}
                />
                <TextField
                  label="Amount"
                  className={classes.textField}
                  value={income.amount}
                  onChange={handleIncomeTextFieldChange(ii)}
                  name="amount"
                  InputProps={{
                    inputComponent: MoneyFormat as any,
                  }} />
                <TextField
                  label="Occurrence Day"
                  className={classes.textField}
                  type="number"
                  placeholder="1-31"
                  value={income.occurrencesDay}
                  onChange={handleIncomeTextFieldChange(ii)}
                  name="occurrencesDay"
                />
                <FormControl className={classes.formControl}>
                  <InputLabel id={`occurrences-months-${ii}`}>Months</InputLabel>
                  <Select
                    labelId={`occurrences-months-${ii}`}
                    value={income.occurrencesMonths}
                    className={classes.selectField}
                    name="occurrencesMonths"
                    onChange={handleIncomeTextFieldChange(ii)}
                    multiple
                  >
                    <MenuItem disabled value="">Select Months</MenuItem>
                    <MenuItem value={1}>January</MenuItem>
                    <MenuItem value={2}>February</MenuItem>
                    <MenuItem value={3}>Mars</MenuItem>
                    <MenuItem value={4}>April</MenuItem>
                    <MenuItem value={5}>May</MenuItem>
                    <MenuItem value={6}>June</MenuItem>
                    <MenuItem value={7}>July</MenuItem>
                    <MenuItem value={8}>August</MenuItem>
                    <MenuItem value={9}>September</MenuItem>
                    <MenuItem value={10}>October</MenuItem>
                    <MenuItem value={11}>November</MenuItem>
                    <MenuItem value={12}>December</MenuItem>
                  </Select>
                </FormControl>
                <IconButton
                  className={classes.deleteButton}
                  aria-label="delete"
                  onClick={() => props.handleRemoveIncome(ii)}
                ><DeleteIcon /></IconButton>
              </Grid>
              {income.discounts.map((discount, di) => {
                return (
                  <Grid item className={classes.discounts} xs={12} key={di}>
                    <FormControl className={classes.formControl}>
                      <InputLabel id={`discount-type-${di}`}>Discount Type</InputLabel>
                      <Select
                        labelId={`discount-type-${di}`}
                        value={discount.discountType}
                        onChange={handleDiscountTextFieldChange(ii, di)}
                        name="discountType"
                      >
                        <MenuItem disabled value="">Discount Type</MenuItem>
                        <MenuItem value="INSS">INSS</MenuItem>
                        <MenuItem value="IRRF">IRRF</MenuItem>
                        <MenuItem value="HEALTH_CARE">Health Care</MenuItem>
                        <MenuItem value="MEALS">Meals</MenuItem>
                        <MenuItem value="PARKING">Parking</MenuItem>
                        <MenuItem value="OTHER">Other</MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      label="Discount Name"
                      value={discount.name || discount.discountType}
                      name="name"
                      onChange={handleDiscountTextFieldChange(ii, di)}
                      className={classes.textField} />
                    <TextField
                      label="Amount"
                      name="amount"
                      value={discount.amount}
                      onChange={handleDiscountTextFieldChange(ii, di)}
                      className={classes.textField}
                      InputProps={{
                        inputComponent: MoneyFormat as any,
                      }}
                    />
                    <IconButton
                      className={classes.deleteButton}
                      aria-label="delete"
                      onClick={() => props.handleRemoveIncomeDiscount(ii, di)}
                    ><DeleteIcon /></IconButton>
                  </Grid>
                );
              })}
              <Grid item xs={12} className={classes.discounts}>
                <Button
                  variant="contained"
                  color="default"
                  className={classes.addButton}
                  startIcon={<AddCircleIcon />}
                  onClick={() => props.handleAddDiscountIncome(ii)}
                >Add Discount</Button>
              </Grid>
            </div>
          );
        })}
      </Paper>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="default"
          className={classes.addButton}
          startIcon={<AddCircleIcon />}
          onClick={props.handleAddIncome}
        >
          Add Income
        </Button>
      </Grid>
    </Grid>
  );
};

export default IncomeForm;
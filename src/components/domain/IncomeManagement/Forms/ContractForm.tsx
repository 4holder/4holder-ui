import React from "react";
import {createStyles, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import MoneyFormat from "../../../common/NumberFormat/MoneyFormat";
import MomentUtils from '@date-io/moment';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import {NewFinancialContractInput} from "../types";
import CNPJFormat from "../../../common/NumberFormat/CNPJFormat";

const useStyles = makeStyles((theme: Theme) => createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 320,
    },
    textField: {
      margin: theme.spacing(1),
      minWidth: 320,
    },
  })
);

interface ContractFormProps {
  inputData: NewFinancialContractInput;
  handleInputDataChange: (key: string, value: string | Date) => void
}

const ContractForm: React.FC<ContractFormProps> = (props) => {
  const classes = useStyles();

  const { contractType } = props.inputData;

  const handleDateChange = (fieldName: string, date: MaterialUiPickersDate) => {
    props.handleInputDataChange(fieldName, date ? date.toDate() : new Date());
  };

  const handleTextFieldChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    props.handleInputDataChange(e.target.name, e.target.value);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FormControl className={classes.formControl}>
          <InputLabel id="contract-type-label">Contract Type</InputLabel>
          <Select
            labelId="contract-type-label"
            id="contract-type"
            value={contractType}
            label="Contract Type"
            disabled={true} >
            <MenuItem value="CLT">CLT</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Gross Salary"
          name="grossSalary"
          InputProps={{
            inputComponent: MoneyFormat as any,
          }}
          value={props.inputData.grossSalary}
          onChange={handleTextFieldChange}
          className={classes.textField} />
        <TextField
          label="Dependents"
          type="number"
          value={props.inputData.dependentsQuantity}
          onChange={handleTextFieldChange}
          name="dependentsQuantity"
          className={classes.textField} />
        <TextField
          label="Legal Deductions"
          name="deductions"
          value={props.inputData.deductions}
          onChange={handleTextFieldChange}
          className={classes.textField}
          InputProps={{
            inputComponent: MoneyFormat as any,
          }}/>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Contract Name"
          className={classes.textField}
          value={props.inputData.name}
          onChange={handleTextFieldChange}
          name="name"
        />

        <TextField
          label="CNPJ"
          className={classes.textField}
          value={props.inputData.companyCnpj}
          onChange={handleTextFieldChange}
          name="companyCnpj"
          InputProps={{
            inputComponent: CNPJFormat as any,
          }}
        />
      </Grid>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid item xs={12}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format={"MMMM DD, yyyy"}
            label="Start Date"
            value={props.inputData.startDate}
            name="startDate"
            onChange={date => handleDateChange("startDate", date)}
            className={classes.textField}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />

          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format={"MMMM DD, yyyy"}
            label="End Date"
            value={props.inputData.endDate}
            className={classes.textField}
            onChange={date => handleDateChange("endDate", date)}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    </Grid>
  );
};

export default ContractForm;
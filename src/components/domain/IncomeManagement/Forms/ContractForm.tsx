import React from "react";
import {createStyles, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import MoneyFormat from "../../../common/NumberFormat/MoneyFormat";
import MomentUtils from '@date-io/moment';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import moment from "moment";

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

const ContractForm: React.FC = () => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] =
    React.useState<MaterialUiPickersDate>(moment());

  const handleDateChange = (date: MaterialUiPickersDate) => {
    setSelectedDate(date);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FormControl className={classes.formControl}>
          <InputLabel id="contract-type-label">Contract Type</InputLabel>
          <Select
            labelId="contract-type-label"
            id="contract-type"
            value={"CLT"}
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
          className={classes.textField} />
        <TextField
          label="Dependents"
          type="number"
          name="dependentsQuantity"
          className={classes.textField} />
        <TextField
          label="Legal Deductions"
          name="deductions"
          className={classes.textField}
          InputProps={{
            inputComponent: MoneyFormat as any,
          }}/>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Company Name"
          className={classes.textField}
          value=""
          name="contractName" />

        <TextField
          label="CNPJ"
          className={classes.textField}
          value=""
          name="companyCnpj" />
      </Grid>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid item xs={12}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format={"MMMM DD, yyyy"}
            label="Start Date"
            value={selectedDate}
            onChange={handleDateChange}
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
            value={selectedDate}
            className={classes.textField}
            onChange={handleDateChange}
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
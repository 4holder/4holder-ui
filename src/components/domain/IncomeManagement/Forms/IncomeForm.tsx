import React from "react";
import {
  createStyles,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Theme,
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {makeStyles} from "@material-ui/core/styles";
import MoneyFormat from "../../../common/NumberFormat/MoneyFormat";
import {Skeleton} from "@material-ui/lab";

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
  deleteButton: {
    margin: theme.spacing(2),
  },
  addButton: {
    margin: theme.spacing(2),
  },
  skeleton: {
    margin: theme.spacing(1),
    display: "inline-block",
  },
  skeletonCircle: {
    display: "inline-block",
    marginLeft: 25,
  },
  discounts: {
    marginLeft: 25,
  },
}));

const IncomeForm: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12}>
        <FormControl className={classes.formControl}>
          <InputLabel id="income-type-label">Income Type</InputLabel>
          <Select
            labelId="income-type-label"
            id="income-type"
            label="Income Type">
            <MenuItem disabled value="">Income Type</MenuItem>
            <MenuItem value="SALARY">Salary</MenuItem>
            <MenuItem value="THIRTEENTH_SALARY">Thirteenth Salary</MenuItem>
            <MenuItem value="THIRTEENTH_SALARY_ADVANCE">Thirteenth Salary Advance</MenuItem>
            <MenuItem value="PROFIT_SHARING">Profit Sharing</MenuItem>
            <MenuItem value="OTHER">Other</MenuItem>
          </Select>
        </FormControl>
        <TextField label="Income Name" className={classes.textField} />
        <TextField
          label="Value"
          className={classes.textField}
          InputProps={{
            inputComponent: MoneyFormat as any,
          }} />
        <TextField
          label="Occurrence Day"
          className={classes.textField}
          type="number"
          placeholder="1-31"
          name="occurrencesDay"
        />
        <FormControl className={classes.formControl}>
          <InputLabel id={`occurrences-months-1`}>Months</InputLabel>
          <Select
            labelId={`occurrences-months-1`}
            value={[""]}
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
        <IconButton className={classes.deleteButton} aria-label="delete"><DeleteIcon /></IconButton>
      </Grid>
      <Grid item xs={12} className={classes.discounts}>
        <FormControl className={classes.formControl}>
          <InputLabel id={`discount-type-1`}>Discount Type</InputLabel>
          <Select
            data-testid={`discount-type-1`}
            labelId={`discount-type-1`}
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
        <TextField label="Discount Name" className={classes.textField} />
        <TextField
          label="Value"
          placeholder="Value"
          name={`discount_1`}
          className={classes.textField}
          InputProps={{
            inputComponent: MoneyFormat as any,
          }}
        />
        <IconButton className={classes.deleteButton} aria-label="delete"><DeleteIcon /></IconButton>
      </Grid>
      <Grid item xs={12}  className={classes.discounts}>
        <Skeleton variant="text" width={fieldWidth} className={classes.skeleton} />
        <Skeleton variant="text" width={fieldWidth} className={classes.skeleton} />
        <Skeleton variant="text" width={fieldWidth} className={classes.skeleton} />
        <IconButton color={"secondary"} className={classes.addButton}>
          <AddCircleIcon />
        </IconButton>
      </Grid>
      <Grid item xs={12}>
        <Skeleton variant="text" width={fieldWidth} className={classes.skeleton} />
        <Skeleton variant="text" width={fieldWidth} className={classes.skeleton} />
        <Skeleton variant="text" width={fieldWidth} className={classes.skeleton} />
        <Skeleton variant="text" width={fieldWidth} className={classes.skeleton} />
        <Skeleton variant="text" width={fieldWidth} className={classes.skeleton} />
        <IconButton color={"secondary"} className={classes.addButton}>
          <AddCircleIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default IncomeForm;
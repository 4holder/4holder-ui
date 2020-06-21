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
  Theme
} from "@material-ui/core";
import MoneyFormat from "../../../common/NumberFormat/MoneyFormat";
import {makeStyles} from "@material-ui/core/styles";
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleIcon from '@material-ui/icons/AddCircle';

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
}));

const IncomeDiscountForm: React.FC = () => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12}>
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
    </Grid>
  );
};

export default IncomeDiscountForm;
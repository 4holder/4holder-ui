import React, {
  useState,
} from "react";
import {
  createStyles,
  FormControl,
  Grid,
  InputBase,
  InputLabel,
  List,
  MenuItem,
  Select,
  TextField, Theme,
  Typography, withStyles
} from "@material-ui/core";
import MoneyFormat from "../../../common/NumberFormat/MoneyFormat";
import { Income } from "../NewIncome";
import {centsToCurrency, sanitizeValue} from "../utils";
import IncomeDiscountForm from "./IncomeDiscountForm";

interface IncomeFormProps {
  fieldKey: number;
  income: Income;
  handleChange: (i: Income) => void;
}

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      width: '250px',
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }),
)(InputBase);

interface State {
  amount: number;
  occurrencesDay: number;
  occurrencesMonths: number[];
}

const IncomeForm: React.FC<IncomeFormProps> = ({
  fieldKey,
  income,
  handleChange,
}: IncomeFormProps) => {
  const occurrenceDayLabel = `Dia`;

  const [
    incomeForm,
    setIncome,
  ] = useState<State>({
    amount: income.amount.amount,
    occurrencesDay: income.occurrences.day,
    occurrencesMonths: income.occurrences.months,
  });

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant={"subtitle2"}>{income.name}</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label={income.name}
          variant="outlined"
          placeholder={income.name}
          value={centsToCurrency(incomeForm.amount)}
          name="amount"
          onChange={event => {
            const newAmount = sanitizeValue(event.target.value);
            const newIncome = {
              ...incomeForm,
              amount: newAmount,
            };

            handleChange({
              ...income,
              amount: {
                ...income.amount,
                amount: newAmount,
              },
            });
            setIncome(newIncome);
          }}
          InputProps={{
            inputComponent: MoneyFormat as any,
          }}
        />
        <TextField
          label={occurrenceDayLabel}
          variant="outlined"
          type="number"
          placeholder={occurrenceDayLabel}
          value={incomeForm.occurrencesDay}
          onChange={event => {
            const newOccurrencesDay = parseInt(event.target.value);
            const newIncome = {
              ...incomeForm,
              occurrencesDay: newOccurrencesDay,
            };

            handleChange({
              ...income,
              occurrences: {
                ...income.occurrences,
                day: newOccurrencesDay,
              },
            });
            setIncome(newIncome);
          }}
          name="occurrencesDay"
        />
        <FormControl>
          <InputLabel id={`occurrences-months-${fieldKey}`}>Meses</InputLabel>
          <Select
            data-testid={`occurrences-months-${fieldKey}`}
            labelId={`occurrences-months-${fieldKey}`}
            variant="outlined"
            multiple
            value={incomeForm.occurrencesMonths}
            input={<BootstrapInput />}
            onChange={event => {
              const newOccurrencesMonths = event.target.value as number[];
              const newIncome = {
                ...incomeForm,
                occurrencesMonths: newOccurrencesMonths,
              };

              handleChange({
                ...income,
                occurrences: {
                  ...income.occurrences,
                  months: newOccurrencesMonths,
                },
              });
              setIncome(newIncome);
            }}
          >
            <MenuItem disabled value="">Selecione os Meses</MenuItem>
            <MenuItem value={1}>Janeiro</MenuItem>
            <MenuItem value={2}>Fevereiro</MenuItem>
            <MenuItem value={3}>Março</MenuItem>
            <MenuItem value={4}>Abril</MenuItem>
            <MenuItem value={5}>Maio</MenuItem>
            <MenuItem value={6}>Junho</MenuItem>
            <MenuItem value={7}>Julho</MenuItem>
            <MenuItem value={8}>Agosto</MenuItem>
            <MenuItem value={9}>Setembro</MenuItem>
            <MenuItem value={10}>Outubro</MenuItem>
            <MenuItem value={11}>Novembro</MenuItem>
            <MenuItem value={12}>Dezembro</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid hidden={!income.discounts.length} item xs={6}>
        <Typography variant={"caption"}>Descontos</Typography>
        <List>
          { income.discounts.map((discount, index) => {
              return (
                <IncomeDiscountForm key={index}
                                    fieldKey={index}
                                    discount={discount}
                                    handleChange={(index, discount) => {
                                      // TODO:
                                      //  - Create a state for income discounts
                                      //  - Update the discount triggered in this event
                                      //  - Call the callback using the new Income
                                      console.log(index);
                                      console.log(discount);
                                    }}
                                    handleRemove={(index) => {
                                      // TODO:
                                      //  - Create a state for income discounts
                                      //  - Remove the discount triggered in this event
                                      //  - Call the callback using the new Income
                                      console.log(index);
                                    }}
                />
              );
            })
          }
        </List>
      </Grid>
    </Grid>
  );
};

export default IncomeForm;
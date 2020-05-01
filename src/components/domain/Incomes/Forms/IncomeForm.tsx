import {
  createStyles,
  FormControl,
  Grid,
  InputBase,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  TextField, Theme,
  Typography, withStyles
} from "@material-ui/core";
import Dinero from "dinero.js";
import MoneyFormat from "../../../common/NumberFormat/MoneyFormat";
import React from "react";
import { Income } from "../NewIncome";

const centsToCurrency = (amount: number) =>
  Dinero({amount: amount, currency: "BRL"})
    .toRoundedUnit(2)
    .toFixed(2);

interface IncomeFormProps {
  fieldKey: number;
  income: Income;
  handleChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
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

const IncomeForm: React.FC<IncomeFormProps> = ({
  fieldKey,
  income,
  handleChange,
}: IncomeFormProps) => {
  const value = centsToCurrency(income.amount.amount);
  const occurrenceDayLabel = `Dia`;
  const occurrenceDayFieldName = `occurrence_${fieldKey}`;

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
          value={value}
          name={fieldKey.toString()}
          onChange={handleChange}
          InputProps={{
            inputComponent: MoneyFormat as any,
          }}
        />
        <TextField
          label={occurrenceDayLabel}
          variant="outlined"
          placeholder={occurrenceDayLabel}
          value={income.occurrences.day}
          name={occurrenceDayFieldName}
          onChange={handleChange}
        />
        <FormControl>
          <InputLabel id="menu-item">Mês</InputLabel>
          <Select
            labelId="menu-item"
            variant="outlined"
            multiple
            value={income.occurrences.months}
            input={<BootstrapInput />}
          >
            <MenuItem disabled value="">Selecione os Meses</MenuItem>
            <MenuItem value={"1"}>Janeiro</MenuItem>
            <MenuItem value={"2"}>Fevereiro</MenuItem>
            <MenuItem value={"3"}>Março</MenuItem>
            <MenuItem value={"4"}>Abril</MenuItem>
            <MenuItem value={"5"}>Maio</MenuItem>
            <MenuItem value={"6"}>Junho</MenuItem>
            <MenuItem value={"7"}>Julho</MenuItem>
            <MenuItem value={"8"}>Agosto</MenuItem>
            <MenuItem value={"9"}>Setembro</MenuItem>
            <MenuItem value={"10"}>Outubro</MenuItem>
            <MenuItem value={"11"}>Novembro</MenuItem>
            <MenuItem value={"12"}>Dezembro</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid hidden={!income.discounts.length} item xs={6}>
        <Typography variant={"caption"}>Descontos</Typography>
        <List>
          { income.discounts.map((discount, index) => {
              return (
                <ListItem key={discount.discountType}>
                  <TextField
                    label={discount.discountType}
                    placeholder={discount.discountType}
                    variant="outlined"
                    value={centsToCurrency(discount.amount.amount)}
                    name={`${fieldKey}_discount_${index}`}
                    onChange={handleChange}
                    InputProps={{
                      inputComponent: MoneyFormat as any,
                    }}
                  />
                </ListItem>
              );
            })
          }
        </List>
      </Grid>
    </Grid>
  );
};

export default IncomeForm;
import React, {
  useState,
} from "react";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  List,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import MoneyFormat from "../../../common/NumberFormat/MoneyFormat";
import {centsToCurrency, sanitizeValue} from "../utils";
import IncomeDiscountForm from "./IncomeDiscountForm";
import BootstrapInput from "./SelectBootstrap";
import { Discount, Income } from "../types";

interface IncomeFormProps {
  fieldKey: number;
  income: Income;
  handleChange: (index: number, income: Income) => void;
}

interface State {
  amount: number;
  incomeType: string;
  occurrencesDay: number;
  occurrencesMonths: number[];
  discounts: Discount[],
}

const IncomeForm: React.FC<IncomeFormProps> = ({
  fieldKey,
  income,
  handleChange,
}: IncomeFormProps) => {
  const occurrenceDayLabel = `Dia`;

  const [
    state,
    setState,
  ] = useState<State>({
    amount: income.amount.amount,
    incomeType: income.incomeType,
    occurrencesDay: income.occurrences.day,
    occurrencesMonths: income.occurrences.months,
    discounts: income.discounts,
  });

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant={"subtitle2"}>{income.name}</Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl>
          <InputLabel id={`income-type-${fieldKey}`}>Tipo</InputLabel>
          <Select
            data-testid={`income-type-${fieldKey}`}
            labelId={`income-type-${fieldKey}`}
            variant="outlined"
            value={state.incomeType}
            input={<BootstrapInput />}
            onChange={e => {
              const incomeType = e.target.value as string;

              handleChange(fieldKey, {
                ...income,
                incomeType,
              } as Income);

              setState({
                ...state,
                incomeType,
              });
            }}
          >
            <MenuItem disabled value="">Tipo de Provento</MenuItem>
            <MenuItem value="SALARY">Salário</MenuItem>
            <MenuItem value="THIRTEENTH_SALARY">Décimo Terceiro</MenuItem>
            <MenuItem value="THIRTEENTH_SALARY_ADVANCE">Adiantamento Décimo Terceiro</MenuItem>
            <MenuItem value="PROFIT_SHARING">PLR</MenuItem>
            <MenuItem value="OTHER">Outro</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Valor"
          variant="outlined"
          placeholder="Valor"
          value={centsToCurrency(state.amount)}
          name="amount"
          onChange={event => {
            const newAmount = sanitizeValue(event.target.value);
            const newIncome = {
              ...state,
              amount: newAmount,
            };

            handleChange(fieldKey, {
              ...income,
              amount: {
                ...income.amount,
                amount: newAmount,
              },
            });
            setState(newIncome);
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
          value={state.occurrencesDay}
          onChange={event => {
            const newOccurrencesDay = parseInt(event.target.value);
            const newIncome = {
              ...state,
              occurrencesDay: newOccurrencesDay,
            };

            handleChange(fieldKey,{
              ...income,
              occurrences: {
                ...income.occurrences,
                day: newOccurrencesDay,
              },
            });
            setState(newIncome);
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
            value={state.occurrencesMonths}
            input={<BootstrapInput />}
            onChange={event => {
              const newOccurrencesMonths = event.target.value as number[];
              const newIncome = {
                ...state,
                occurrencesMonths: newOccurrencesMonths,
              };

              handleChange(fieldKey, {
                ...income,
                occurrences: {
                  ...income.occurrences,
                  months: newOccurrencesMonths,
                },
              });
              setState(newIncome);
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
      <Grid item xs={6}>
        <Typography variant={"caption"}>Descontos</Typography>
        <List>
          { state.discounts.map((discount, index) => {
              return (
                <IncomeDiscountForm key={index}
                                    fieldKey={index}
                                    discount={discount}
                                    handleChange={(index, discount) => {
                                      const newDiscounts =
                                        state
                                          .discounts
                                          .map((d, i) => i === index ? discount : d);

                                      handleChange(fieldKey, {
                                        ...income,
                                        discounts: newDiscounts,
                                      });

                                      setState({
                                        ...state,
                                        discounts: newDiscounts,
                                      });
                                    }}
                />
              );
            })
          }
        </List>

        <Button color={"default"}
                style={{
                  margin: '8px',
                }}
                onClick={e => {
                  e.preventDefault();
                  const discount = {
                    amount: {
                      amount: 0,
                      currency: 'BRL',
                    },
                    discountType: 'OTHER',
                  } as Discount;

                  const newDiscounts = [...state.discounts, ...[discount]];

                  handleChange(fieldKey, {
                    ...income,
                    discounts: newDiscounts,
                  });

                  setState({
                    ...state,
                    discounts: newDiscounts,
                  })
                }}>
          Adicionar Desconto
        </Button>
        <Button color={"default"}
                style={{
                  margin: '8px',
                }}
                onClick={e => {
                  e.preventDefault();
                  const index = state.discounts.length - 1;
                  const newDiscounts = state.discounts.filter((_, i) => i !== index);

                  handleChange(fieldKey, {
                    ...income,
                    discounts: newDiscounts,
                  });

                  setState({
                    ...state,
                    discounts: newDiscounts,
                  });
                }}
        >
          Remover Último Desconto
        </Button>
      </Grid>
    </Grid>
  );
};

export default IncomeForm;
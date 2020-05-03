import React, { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import { Discount } from "../types";
import MoneyFormat from "../../../common/NumberFormat/MoneyFormat";
import { centsToCurrency, sanitizeValue } from "../utils";
import BootstrapInput from "./SelectBootstrap";

interface IncomeDiscountFormProps {
  fieldKey: number;
  discount: Discount;
  handleChange: (index: number, discount: Discount) => void;
  handleRemove?: (index: number) => void;
}

interface State {
  fieldKey: number;
  amount: number;
  discountType: string;
}

const IncomeDiscountForm: React.FC<IncomeDiscountFormProps> = ({
  fieldKey,
  discount,
  handleChange,
}: IncomeDiscountFormProps) => {
  const [ state, setState ] = useState<State>({
    fieldKey,
    amount: discount.amount.amount,
    discountType: discount.discountType,
  });

  return (
    <div>
      <FormControl>
        <InputLabel id={`discount-type-${fieldKey}`}>Tipo</InputLabel>
        <Select
          data-testid={`discount-type-${fieldKey}`}
          labelId={`discount-type-${fieldKey}`}
          variant="outlined"
          value={state.discountType}
          input={<BootstrapInput />}
          onChange={e => {
            const discountType = e.target.value as string;

            handleChange(fieldKey, {
              ...discount,
              amount: {
                ...discount.amount,
                discountType: discountType,
              }
            } as Discount);

            setState({
              ...state,
              discountType: discountType,
            });
          }}
        >
          <MenuItem disabled value="">Tipo de Desconto</MenuItem>
          <MenuItem value="INSS">INSS</MenuItem>
          <MenuItem value="IRRF">IRRF</MenuItem>
          <MenuItem value="HEALTH_CARE">Plano de Saúde</MenuItem>
          <MenuItem value="MEALS">Alimentção</MenuItem>
          <MenuItem value="PARKING">Estacionamento</MenuItem>
          <MenuItem value="OTHER">Outro</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Valor"
        placeholder="Valor"
        variant="outlined"
        value={centsToCurrency(state.amount)}
        name={`discount_${fieldKey}`}
        onChange={e => {
          const amount = sanitizeValue(e.target.value);

          handleChange(fieldKey, {
            ...discount,
            amount: {
              ...discount.amount,
              amount: amount,
            }
          } as Discount);

          setState({
            ...state,
            amount: amount,
          });
        }}
        InputProps={{
          inputComponent: MoneyFormat as any,
        }}
      />
    </div>);
};

export default IncomeDiscountForm;
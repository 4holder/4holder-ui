import React, { useState } from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import { Discount } from "../types";
import MoneyFormat from "../../../common/NumberFormat/MoneyFormat";
import {Button, Fab, TextField} from "@material-ui/core";
import {centsToCurrency, sanitizeValue} from "../utils";
import index from "../../../common/NumberFormat";

interface IncomeDiscountFormProps {
  fieldKey: number;
  discount: Discount;
  handleChange: (index: number, discount: Discount) => void;
  handleRemove: (index: number) => void;
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
  handleRemove,
}: IncomeDiscountFormProps) => {
  const [ state, setState ] = useState<State>({
    fieldKey,
    amount: discount.amount.amount,
    discountType: discount.discountType,
  });

  return (
    <div>
      <TextField
        label={state.discountType}
        placeholder={state.discountType}
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
      <Fab color={"default"}
           aria-label="Remove"
           data-testid={"remove-button"}
           style={{
             margin: '8px',
           }}
           onClick={e => {
             e.preventDefault();
             handleRemove(fieldKey);
           }}
      >
        <DeleteIcon />
      </Fab>
    </div>);
};

export default IncomeDiscountForm;
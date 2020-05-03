import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import IncomeDiscountForm from "./IncomeDiscountForm";
import {Discount} from "../types";

describe('Income Discount Form', () => {
  const onChangeMock = jest.fn();
  const onRemoveMock = jest.fn();
  const fieldKey = 0;

  const discount = {
    discountType: 'INSS',
    amount: {
      amount: 500,
      currency: 'BRL',
    },
  } as Discount;

  it('should proper render discount components', () => {
    const {
      getAllByPlaceholderText,
      getByTestId,
    } = render(
      <IncomeDiscountForm
        fieldKey={fieldKey}
        discount={discount}
        handleChange={onChangeMock}
        handleRemove={onRemoveMock}
      />
    );

    const inssInputEl =  getAllByPlaceholderText(discount.discountType)[0];
    const removeDiscountEl = getByTestId('remove-button');

    const inssFieldName = `discount_${fieldKey}`;
    expect(inssInputEl.getAttribute('name')).toEqual(inssFieldName);
    expect(inssInputEl.getAttribute('value')).toEqual("R$5,00");

    fireEvent.change(inssInputEl, { target: { value: "R$15,01" } });
    expect(onChangeMock).toBeCalledWith(0,
      {
        ...discount,
        amount: {
          ...discount.amount,
          amount: 1501,
        }
      }
    );

    fireEvent.click(removeDiscountEl);
    expect(onRemoveMock).toBeCalledWith(0);
  });
});

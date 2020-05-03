import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import IncomeForm from './IncomeForm';
import { Income } from "../types";

test('render a income edit box with proper parameters', () => {
  const onChangeMock = jest.fn();;
  const fieldKey = 0;

  const income = {
    name: 'Salary',
    incomeType: 'SALARY',
    occurrences: {
      day: 15,
      months: [1,2,3]
    },
    amount: {
      amount: 10000,
      currency: 'BRL',
    },
    discounts: [
      {
        amount: {
          amount: 500,
          currency: 'BRL',
        },
        discountType: 'INSS',
      },
      {
        amount: {
          amount: 1000,
          currency: 'BRL',
        },
        discountType: 'IRRF',
      },
    ]
  } as Income;

  const {
    getAllByText,
    getAllByPlaceholderText,
  } = render(
    <IncomeForm
      fieldKey={fieldKey}
      handleChange={onChangeMock}
      income={income}
    />
  );

  const titleEl = getAllByText(income.name);
  const netSalaryInputEl = getAllByPlaceholderText('Valor')[0];

  expect(titleEl.length).toBeGreaterThan(0);
  expect(netSalaryInputEl).toBeInTheDocument();
  expect(netSalaryInputEl.getAttribute('value')).toEqual("R$100,00");

  fireEvent.change(netSalaryInputEl, { target: { value: "R$99,99" } });
  expect(onChangeMock).toBeCalledWith(0, {
    ...income,
    amount: {
      ...income.amount,
      amount: 9999,
    },
  });

  onChangeMock.mockReset();

  const occurrencesDayInputEl = getAllByPlaceholderText('Dia')[0];
  expect(occurrencesDayInputEl).toBeInTheDocument();
  expect(occurrencesDayInputEl.getAttribute('value')).toEqual("15");

  fireEvent.change(occurrencesDayInputEl, { target: { value: "20" } });
  expect(onChangeMock).toBeCalledWith(0, {
    ...income,
    occurrences: {
      ...income.occurrences,
      day: 20,
    },
  });
});

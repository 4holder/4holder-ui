import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import IncomeForm from './IncomeForm';

test('render a income edit box with proper parameters', () => {
  const onChangeMock = jest.fn();;
  const formTitle = 'Salário Líquido';
  const fieldKey = 0;

  const {
    getAllByText,
    getAllByPlaceholderText,
  } = render(
    <IncomeForm
      fieldKey={fieldKey}
      handleChange={onChangeMock}
      income={{
        name: formTitle,
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
      }}

    />
  );

  const titleEl = getAllByText(formTitle);
  const netSalaryInputEl = getAllByPlaceholderText(formTitle)[0];
  const inssInputEl = getAllByPlaceholderText('INSS')[0];
  const irrfInputEl = getAllByPlaceholderText('IRRF')[0];

  expect(titleEl.length).toBeGreaterThan(0);
  expect(netSalaryInputEl).toBeInTheDocument();
  expect(netSalaryInputEl.getAttribute('name')).toEqual(fieldKey.toString());
  expect(netSalaryInputEl.getAttribute('value')).toEqual("R$100,00");
  const inssFieldName = `${fieldKey}_discount_0`;
  expect(inssInputEl.getAttribute('name')).toEqual(inssFieldName);
  expect(inssInputEl.getAttribute('value')).toEqual("R$5,00");
  const irrfFieldName = `${fieldKey}_discount_1`;
  expect(irrfInputEl.getAttribute('name')).toEqual(irrfFieldName);
  expect(irrfInputEl.getAttribute('value')).toEqual("R$10,00");

  fireEvent.change(netSalaryInputEl, { target: { value: "R$99,99" } });
  expect(onChangeMock).toHaveBeenCalledWith({
    "target": {
      "name": fieldKey.toString(),
      "value": "99.99",
    },
  });

  onChangeMock.mockReset();

  fireEvent.change(inssInputEl, { target: { value: "R$15,01" } });
  expect(onChangeMock).toHaveBeenCalledWith({
    "target": {
      "name": inssFieldName,
      "value": "15.01",
    },
  });

  onChangeMock.mockReset();

  fireEvent.change(irrfInputEl, { target: { value: "R$25,14" } });
  expect(onChangeMock).toHaveBeenCalledWith({
    "target": {
      "name": irrfFieldName,
      "value": "25.14",
    },
  });
});

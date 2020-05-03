import Dinero from "dinero.js";

export const centsToCurrency = (amount: number) =>
  Dinero({amount: amount, currency: "BRL"})
    .toRoundedUnit(2)
    .toFixed(2);

export const sanitizeValue = (value: string) => {
  return parseInt(value.replace('.', ''));
};
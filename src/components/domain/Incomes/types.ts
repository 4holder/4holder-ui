import { Currency } from "dinero.js";

export enum ContractType {
  CLT = "CLT",
}

export interface IncomeResume {
  id: string;
  name: string;
  yearlyGrossIncome?: Amount;
  yearlyNetIncome?: Amount;
  yearlyIncomeDiscount?: Amount;
}

export interface Income {
  name: string;
  incomeType: string;
  occurrences: {
    day: number;
    months: number[];
  };
  amount: Amount;
  discounts: Discount[];
}

export interface Amount {
  amount: number;
  currency: Currency;
}

export interface Discount {
  amount: Amount;
  discountType: string;
}


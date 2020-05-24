import { Currency } from "dinero.js";

export enum ContractType {
  CLT = "CLT",
}

export interface FinancialContract {
  id: string;
  name: string;
  grossAmount: Amount;
  contractType: ContractType;
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


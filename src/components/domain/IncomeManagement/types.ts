import { Currency } from "dinero.js";

export enum ContractType {
  CLT = "CLT",
}

export enum IncomeType {
  SALARY = "SALARY",
}

export enum DiscountType {
  INSS = "INSS",
  OTHER = "OTHER",
}

export interface Occurrences {
  day: number;
  months: number[];
}

export interface IncomeResume {
  id: string;
  name: string;
  yearlyGrossIncome?: Amount;
  yearlyNetIncome?: Amount;
  yearlyIncomeDiscount?: Amount;
}

export interface Amount {
  amount: number;
  currency: Currency;
}

export interface ProjectionPoint {
  amount: Amount;
  dateTime: Date;
}

export interface FinancialMovementsProjection {
  label: String;
  currency: String;
  financialMovements: ProjectionPoint[];
}
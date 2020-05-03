import { Currency } from "dinero.js";

export interface Amount {
  amount: number;
  currency: Currency;
}

export interface Discount {
  amount: Amount;
  discountType: string;
}
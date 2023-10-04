import { v4 as uuidv4 } from "uuid";

export enum CurrencyEnum {
  USD = "USD",
  UAH = "UAH",
}

export class Transaction {
  Id: string;
  Amount: number;
  Currency: CurrencyEnum;

  constructor(amount: number, currency: CurrencyEnum) {
    this.Id = uuidv4();
    this.Amount = amount;
    this.Currency = currency;
  }
}

export class Card {
  Transactions: Transaction[];

  constructor() {
    this.Transactions = [];
  }

  AddTransaction(transaction: Transaction): string;
  AddTransaction(amount: number, currency: CurrencyEnum): string;
  AddTransaction(
    amountOrTransaction: number | Transaction,
    currency?: CurrencyEnum
  ): string {
    let transaction: Transaction;

    if (typeof amountOrTransaction === "number") {
      transaction = new Transaction(amountOrTransaction, currency!);
    } else {
      transaction = amountOrTransaction;
    }

    this.Transactions.push(transaction);
    return transaction.Id;
  }

  GetTransaction(id: string): Transaction | undefined {
    return this.Transactions.find((t) => t.Id === id);
  }

  GetBalance(currency: CurrencyEnum): number {
    return this.Transactions.reduce((sum, t) => {
      if (t.Currency === currency) {
        return sum + t.Amount;
      }
      return sum;
    }, 0);
  }
}

export interface ITransaction {
  id: number;
  origin: string;
  date: Date;
  amount: number;
  categoryId: Category | null;
}

export enum Category {
  Unknown = 0,
  HomeExpenses = 1,
  Transportation = 2,
  Food = 3,
  Clothing = 4,
  Healthcare = 5,
  Entertainment = 6,
  Education = 7,
  Savings = 8,
  Personal = 9,
}

export interface ICategorizeUserTransactionsDTO {
  transactionId: number;
  categoryId: number;
}

export interface IGetByDateDTO {
  bankAccountId: number;
  year: number | null;
  month: number | null;
}

export interface CategoryDTO {
  key: number;
  text: number;
  name: string;
}

export interface TransactionDate {
  year: number;
  months: number[];
}

export interface GetTransactionDatesDTO {
  userId: number;
  bankAccountId: number;
}

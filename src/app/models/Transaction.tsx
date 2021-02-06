export interface ITransaction {
  id: number;
  origin: string;
  date: Date;
  amount: number;
  category: Category;
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

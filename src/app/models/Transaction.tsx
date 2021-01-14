export interface ITransaction {
  id: number;
  origin: string;
  date: Date;
  amount: number;
  category: string;
}
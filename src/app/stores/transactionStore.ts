import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { IGetByDateDTO, ITransaction } from "../models/Transaction";

export default class TransactionStore {
  transactions: ITransaction[] = [];
  constructor() {
    makeAutoObservable(this);
  }

  loadTransactions = async (body: IGetByDateDTO) => {
    try {
      const transactions = await agent.Transactions.GetByDate(body);
      runInAction(() => (this.transactions = transactions));
    } catch (error) {
      throw error;
    }
  };

  updateTransactions = (updatedTransactions: ITransaction[]) => {
    runInAction(() => (this.transactions = updatedTransactions));
  };
}

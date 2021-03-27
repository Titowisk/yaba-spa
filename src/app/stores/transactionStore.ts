import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import {
  CategoryDTO,
  ICategorizeUserTransactionsDTO,
  IGetByDateDTO,
  ITransaction,
} from "../models/Transaction";

export default class TransactionStore {
  transactionRegistry = new Map<number, ITransaction>();
  paginatedTransactions: ITransaction[] = [];
  currentPage: number = 1;
  pageSize: number = 15;
  categories: CategoryDTO[] = [];

  isUpdating: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  // computed
  get allTransactions(): ITransaction[] {
    return Array.from(this.transactionRegistry.values());
  }

  get totalOfPages(): number {
    if (this.transactionRegistry.size > 0) {
      return Math.ceil(this.transactionRegistry.size / this.pageSize);
    } else {
      return 0;
    }
  }

  get currentTransactionsPage(): ITransaction[] {
    console.log("currentTransactionsPage");
    let startIndex = (this.currentPage - 1) * this.pageSize;
    let endIndex = (this.currentPage - this.totalOfPages) * this.pageSize;
    if (endIndex === 0) {
      return this.allTransactions.slice(startIndex);
    } else {
      return this.allTransactions.slice(startIndex, endIndex);
    }
  }

  get pagesArray(): number[] {
    let pageArray = [];
    for (let index = 1; index < this.totalOfPages + 1; index++) {
      pageArray.push(index);
    }
    return pageArray;
  }

  // actions
  setTransactions = (transactions: ITransaction[]) => {
    this.transactionRegistry.clear();
    transactions.forEach((transaction) =>
      this.transactionRegistry.set(transaction.id, transaction)
    );
  };

  loadTransactions = async (body: IGetByDateDTO) => {
    try {
      const transactions = await agent.Transactions.GetByDate(body);
      // this.transactionRegistry.clear();
      // transactions.forEach(transaction => this.transactionRegistry.set(transaction.id, transaction));
      this.setTransactions(transactions);
    } catch (error) {
      throw error;
    }
  };

  loadCategories = async () => {
    console.log("loadCategories()");
    const categoryList = await agent.Transactions.GetCategories();
    this.categories = categoryList;
  };

  setCurrentPage = (n: number) => {
    this.currentPage = n;
  };

  categorizeAllTransactionsWithSimilarOrigins = async (
    transactionId: number,
    value: any
  ) => {
    let newCategoryId: number = parseInt(value);
    let body: ICategorizeUserTransactionsDTO = {
      transactionId,
      categoryId: newCategoryId,
      userId: 1,
    };
    this.isUpdating = true;
    await agent.Transactions.CategorizeAllTransactionsWithSimilarOrigins(body)
      .then(() => {
        let transaction = this.transactionRegistry.get(transactionId);

        this.transactionRegistry.forEach((currentTransaction, id, map) => {
          if (currentTransaction.origin === transaction!.origin) {
            runInAction(() => {
              currentTransaction.origin = transaction!.origin;
              map.set(id, currentTransaction);
            });
          }
        });
        let body: IGetByDateDTO = { bankAccountId: 9, year: 2020, month: 1 };
        this.loadTransactions(body);
      })
      .catch((error) => {
        console.log(
          "Erro na função: CategorizeAllTransactionsWithSimilarOrigins"
        );
        console.log(error);
      })
      .finally(() => (this.isUpdating = false));
  };
}

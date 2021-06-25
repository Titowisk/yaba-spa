import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import {
  CategoryDTO,
  GetTransactionDatesDTO,
  ICategorizeUserTransactionsDTO,
  IGetByDateDTO,
  ITransaction,
  TransactionDate,
  TransactionsSummary,
} from "../models/Transaction";

export default class TransactionStore {
  transactionRegistry = new Map<number, ITransaction>();
  transactionDatesRegistry = new Map<number, number[]>();
  paginatedTransactions: ITransaction[] = [];
  currentPage: number = 1;
  pageSize: number = 15;
  categories: CategoryDTO[] = [];
  isUpdating: boolean = false;

  // balance summary by month
  totalVolume: number = 0;
  totalExpense: number = 0;
  totalIncome: number = 0;
  incomePercentage: number = 0;
  expensePercentage: number = 0;

  // date menu
  currentSelectedYear: number | null = null;
  currentSelectedMonth: number | null = null;

  // loading
  loading: boolean = false;

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
    let endIndex = startIndex + this.pageSize;
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

  get transactionYears(): number[] {
    return Array.from(this.transactionDatesRegistry.keys());
  }

  get monthsOfTransactionYear(): number[] | null {
    if (this.currentSelectedYear === null) return [];
    else {
      let year = <number>this.currentSelectedYear;
      let months = this.transactionDatesRegistry.get(year);
      if (months === undefined) return null;

      return months;
    }
  }

  // actions
  setTransactions = (transactions: ITransaction[]) => {
    this.transactionRegistry.clear();
    transactions.forEach((transaction) =>
      this.transactionRegistry.set(transaction.id, transaction)
    );
  };

  setTransactionDates = (transactionDates: TransactionDate[]) => {
    this.transactionDatesRegistry.clear();
    transactionDates.forEach((transactionDate) =>
      this.transactionDatesRegistry.set(
        transactionDate.year,
        transactionDate.months
      )
    );
    this.currentSelectedYear = this.transactionYears[0];

    let months = this.monthsOfTransactionYear;
    if (months === null) this.currentSelectedMonth = null;
    else this.currentSelectedMonth = months[0];
  };

  setBalanceSummary = (summary: TransactionsSummary) => {
    this.totalVolume = summary.totalVolume;
    this.totalIncome = summary.totalIncome;
    this.totalExpense = summary.totalExpense;
    this.incomePercentage = summary.incomePercentage;
    this.expensePercentage = summary.expensePercentage;
  };

  loadTransactions = async (body: IGetByDateDTO) => {
    try {
      this.loading = true;
      const transactionsSummary = await agent.Transactions.GetByDate(body);
      this.setTransactions(transactionsSummary.transactions);
      this.setBalanceSummary(transactionsSummary);
    } catch (error) {
      throw error;
    } finally {
      this.loading = false;
    }
  };

  loadTransactionDates = async (body: GetTransactionDatesDTO) => {
    // console.log("loadTransactionDates");
    try {
      const transactionDates = await agent.Transactions.GetTransactionDates(
        body
      );
      this.setTransactionDates(transactionDates);
    } catch (error) {
      throw error;
    }
  };

  loadCategories = async () => {
    // console.log("loadCategories()");
    const categoryList = await agent.Transactions.GetCategories();
    this.categories = categoryList;
  };

  setCurrentPage = (n: number) => {
    this.currentPage = n;
  };

  categorizeAllTransactionsWithSimilarOrigins = async (
    transactionId: number,
    bankAccountId: number,
    value: any
  ) => {
    let newCategoryId: number = parseInt(value);
    let body: ICategorizeUserTransactionsDTO = {
      transactionId,
      categoryId: newCategoryId,
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
        let body: IGetByDateDTO = {
          bankAccountId: bankAccountId,
          year: this.currentSelectedYear,
          month: this.currentSelectedMonth,
        };
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

  setCurrentYear = (year: number) => {
    this.currentSelectedYear = year;
    this.currentSelectedMonth = null;
  };

  setCurrentMonth = (month: number) => {
    this.currentSelectedMonth = month;
  };
}

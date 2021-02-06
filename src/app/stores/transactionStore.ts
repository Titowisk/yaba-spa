import { action, makeObservable, observable } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";
import { ITransaction } from "../models/Transaction";

class TransactionStore {
  @observable transactions: ITransaction[] = [];
  @observable transactionsPage: ITransaction[] = [];
  @observable pagination: number[] = [];
  @observable currentPage: number = 1;
  pageSize = 15;

  @action loadTransactions = () => {
    const CreatePages = (dataLength: number) => {
      let totalOfPages = dataLength / this.pageSize;
      let pageArray = [];
      for (let index = 1; index < totalOfPages + 1; index++) {
        pageArray.push(index);
      }
      this.pagination = pageArray;
    };

    agent.Transactions.DevGetByDate({
      userId: 1,
      bankAccountId: 9,
      year: 2020,
      month: 1,
    }).then((transactions) => {
      this.transactions = transactions;
      CreatePages(transactions.length);
      this.handlePagination(transactions);
    });
  };

  @action handlePagination = (transactionData: ITransaction[]) => {
    let totalOfPages = Math.ceil(transactionData.length / this.pageSize);
    let startIndex = (this.currentPage - 1) * this.pageSize;
    let endIndex = (this.currentPage - totalOfPages) * this.pageSize;

    // console.log("HandlePagination");

    if (endIndex === 0) {
      this.transactionsPage = transactionData.slice(startIndex);
    } else {
      this.transactionsPage = transactionData.slice(startIndex, endIndex);
    }
  };

  @action updateTransactionsWithSimilarOrigin = (
    transactionId: number,
    value: any
  ) => {
    let newCategoryId: number = parseInt(value);

    let transaction = this.transactions.find((t) => t.id === transactionId);
    let updatedTransactions = this.transactions.map((currentTransaction) => {
      if (currentTransaction.origin === transaction?.origin) {
        return {
          ...currentTransaction,
          category: newCategoryId,
        };
      }

      return { ...currentTransaction };
    });
    this.transactions = updatedTransactions;
    // TODO: request /api/transactions/CategorizeAllTransactionsWithSimilarOrigins
  };

  @action goFowardPage = () => {
    this.currentPage = this.currentPage + 1;
  };

  @action goBackPage = () => {
    this.currentPage = this.currentPage - 1;
  };

  @action isLastPage = () => {
    return this.currentPage === this.pagination[this.pagination.length];
  };

  constructor() {
    makeObservable(this);
  }
}

export default createContext(new TransactionStore());

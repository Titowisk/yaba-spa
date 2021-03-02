import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import agent from "../../api/agent";
import {
  ICategorizeUserTransactionsDTO,
  IGetByDateDTO,
  ITransaction,
} from "../../models/Transaction";
import { useStore } from "../../stores/store";
import TransactionsBody from "./TransactionsBody";
import { TransactionsFooter } from "./TransactionsFooter";

function TransactionsTable() {
  const { transactionsStore } = useStore();
  const {
    transactionRegistry: transactions,
    currentPage,
    allTransactions,
    currentTransactionsPage,
    pagesArray,
    loadTransactions,
    categorizeAllTransactionsWithSimilarOrigins,
    setCurrentPage,
  } = transactionsStore;

  /* Async Category Update */
  /*edit cell
    - picking a value from dropdown will change all other transactions of this month with equal origin
    - picking a value from dropdown will also make a request to /api/transactions/CategorizeAllTransactionsWithSimilarOrigins
  */
  const UpdateTransactionsWithSimilarOrigin = (
    transactionId: number,
    value: any
  ) => {
    console.log("UpdateTransactionsWithSimilarOrigin");
    console.log(`transactionId: ${transactionId}, value: ${value}`);

    let newCategoryId: number = parseInt(value);
    let body: ICategorizeUserTransactionsDTO = {
      transactionId,
      categoryId: newCategoryId,
      userId: 1,
    };

    agent.Transactions.CategorizeAllTransactionsWithSimilarOrigins(body)
      .then(() => {
        // let transaction = transactions.find((t) => t.id === transactionId);
        let transaction = transactions.get(transactionId);
        // let updatedTransactions = transactions.map((currentTransaction) => {
        //   if (currentTransaction.origin === transaction?.origin) {
        //     return {
        //       ...currentTransaction,
        //       category: newCategoryId,
        //     };
        //   }

        //   return { ...currentTransaction };
        // });
        let updatedTransactions = transactions.forEach(
          (currentTransaction, id, map) => {
            if (currentTransaction.origin === transaction?.origin) {
              currentTransaction.origin = transaction?.origin;
              map.set(id, currentTransaction);
            }
          }
        );
        // transactionsStore.updateTransactions([...updatedTransactions]);
        // setTransactions([...updatedTransactions]);
      })
      .catch((error) => {
        console.log(
          "Erro na função: CategorizeAllTransactionsWithSimilarOrigins"
        );
        console.log(error);
      });
  };

  // TODO: create endpoint to get categories of transaction

  // page was accessed for the first time
  useEffect(() => {
    console.log("First Acess");

    let body: IGetByDateDTO = { bankAccountId: 9, year: 2020, month: 1 };
    loadTransactions(body);
  }, [transactionsStore]);

  return (
    <div>
      <Table celled selectable>
        <Table.Header>
          <Table.Row textAlign="center">
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Origin</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <TransactionsBody
          transactions={currentTransactionsPage}
          UpdateTransactionsWithSimilarOrigin={
            categorizeAllTransactionsWithSimilarOrigins
          }
        />
        <TransactionsFooter
          currentPageNumber={currentPage}
          setCurrentPage={setCurrentPage}
          pagination={pagesArray}
        />
      </Table>
    </div>
  );
}

export default observer(TransactionsTable);

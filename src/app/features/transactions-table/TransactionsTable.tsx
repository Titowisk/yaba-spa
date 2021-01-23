import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dropdown, Icon, Menu, Table } from "semantic-ui-react";
import { ITransaction } from "../../models/Transaction";
import { TransactionsBody } from "./TransactionsBody";
import { TransactionsFooter } from "./TransactionsFooter";

export const TransactionsTable = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  /* Pagination */
  const [transactionPage, setTransactionPage] = useState<ITransaction[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(15);
  const [pagination, setPagination] = useState<number[]>([]);

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
    // console.log(`newCategoryId: ${newCategoryId}`)
    // console.log(`newCategory: ${newCategory.value}`)

    let newCategoryId: number = parseInt(value);

    console.log(`newCategoryId: ${newCategoryId}`);

    let transaction = transactions.find((t) => t.id === transactionId);
    let updatedTransactions = transactions.map((t) => {
      if (t.origin === transaction?.origin) {
        t.category = newCategoryId;
      }
      return t;
    });

    // console.log(`transaction: ${transaction}`)
    // console.log(`updatedTransactions: ${updatedTransactions}`)

    setTransactions(updatedTransactions);
    HandlePagination(transactions);
    // TODO: request /api/transactions/CategorizeAllTransactionsWithSimilarOrigins
  };

  // TODO: create endpoint to get categories of transaction

  const HandlePagination = (transactionData: ITransaction[]) => {
    let totalOfPages = Math.ceil(transactionData.length / pageSize);
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = (currentPage - totalOfPages) * pageSize;

    // console.log("HandlePagination")
    // console.log(`startIndex: ${startIndex}`)
    // console.log(`endIndex: ${endIndex}`)

    if (endIndex === 0) {
      setTransactionPage(transactionData.slice(startIndex));
    } else {
      setTransactionPage(transactionData.slice(startIndex, endIndex));
    }
  };

  const CreatePages = (dataLength: number) => {
    // console.log("Create pages")
    // console.log(`transactions.length: ${dataLength}`)
    // console.log(`pageSize: ${pageSize}`)
    let totalOfPages = dataLength / pageSize;
    let pageArray = [];
    for (let index = 1; index < totalOfPages + 1; index++) {
      pageArray.push(index);
    }

    setPagination(pageArray);
  };

  // page was access for the first time
  useEffect(() => {
    const GetTransactions = () => {
      axios
        .post<ITransaction[]>(
          "https://localhost:5001/api/transactions/DevGetByDate",
          { userId: 1, bankAccountId: 9, year: 2020, month: 1 }
        )
        .then((response) => {
          setTransactions(response.data);
          CreatePages(response.data.length);
          HandlePagination(response.data);
        });
    };

    GetTransactions();
  }, []);

  // page changed
  useEffect(() => {
    console.log("page changed");

    HandlePagination(transactions);
  }, [currentPage]);

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
          transactions={transactionPage}
          UpdateTransactionsWithSimilarOrigin={
            UpdateTransactionsWithSimilarOrigin
          }
        />
        <TransactionsFooter
          currentPageNumber={currentPage}
          setCurrentPage={setCurrentPage}
          pagination={pagination}
        />
      </Table>
    </div>
  );
};

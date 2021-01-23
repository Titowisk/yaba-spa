import axios from "axios";
import React, { useEffect, useState } from "react";
import { Dropdown, Icon, Menu, Table } from "semantic-ui-react";
import { ITransaction } from "../../models/Transaction";

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
        // t.category = categories.find(c => c.value === newCategoryId)?.value
        t.category = newCategoryId;
      }
      return t;
    });

    // console.log(`transaction: ${transaction}`)
    // console.log(`updatedTransactions: ${updatedTransactions}`)

    setTransactions(updatedTransactions);

    // TODO: request /api/transactions/CategorizeAllTransactionsWithSimilarOrigins
  };

  // TODO: create endpoint to get categories of transaction
  const categories = [
    {
      key: 1,
      text: "Home Expenses",
      value: 1,
    },
    {
      key: 2,
      text: "Transportation",
      value: 2,
    },
    {
      key: 3,
      text: "Food",
      value: 3,
    },
    {
      key: 4,
      text: "Clothing",
      value: 4,
    },
    {
      key: 5,
      text: "Healthcare",
      value: 5,
    },
    {
      key: 6,
      text: "Entertainment",
      value: 6,
    },
    {
      key: 7,
      text: "Education",
      value: 7,
    },
    {
      key: 8,
      text: "Savings",
      value: 8,
    },
    {
      key: 9,
      text: "Personal",
      value: 9,
    },
  ];

  const HandlePagination = (transactionData: ITransaction[]) => {
    let totalOfPages = Math.ceil(transactionData.length / pageSize);
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = (currentPage - totalOfPages) * pageSize;

    // console.log("HandlePagination")
    // console.log(`startIndex: ${startIndex}`)
    // console.log(`endIndex: ${endIndex}`)

    if (endIndex === 0) {
      setTransactionPage(transactionData.slice(startIndex));
      return;
    }

    setTransactionPage(transactionData.slice(startIndex, endIndex));
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
    HandlePagination(transactions);
  }, [currentPage]);

  // table transactions changed
  useEffect(() => {
    HandlePagination(transactions);
  }, [transactions]);

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

        <Table.Body>
          {transactionPage.map((transaction: ITransaction) => (
            <Table.Row key={transaction.id}>
              <Table.Cell style={{ textAlign: "center" }}>
                {transaction.date}
              </Table.Cell>
              <Table.Cell>{transaction.origin}</Table.Cell>
              <Table.Cell style={{ textAlign: "center" }}>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(transaction.amount)}
              </Table.Cell>
              <Table.Cell style={{ textAlign: "center" }} width={4}>
                {/* {transaction.category} */}
                <Dropdown
                  defaultValue={transaction.category}
                  onChange={(e, { value }) =>
                    UpdateTransactionsWithSimilarOrigin(transaction.id, value)
                  }
                  fluid
                  selection
                  options={categories}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="4">
              <Menu floated="right" pagination>
                <Menu.Item
                  as="a"
                  icon
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <Icon name="chevron left" />
                </Menu.Item>
                {pagination.map((pageItem) => (
                  <Menu.Item
                    as="a"
                    key={pageItem}
                    onClick={(e) => setCurrentPage(pageItem)}
                  >
                    {pageItem}
                  </Menu.Item>
                ))}
                <Menu.Item
                  as="a"
                  icon
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === pagination[pagination.length - 1]}
                >
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
};

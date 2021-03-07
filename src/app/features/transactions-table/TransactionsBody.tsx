import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Dropdown, Table } from "semantic-ui-react";
import { ITransaction, Category } from "../../models/Transaction";
import { useStore } from "../../stores/store";

function TransactionsBody() {
  const { transactionsStore } = useStore();
  const {
    categorizeAllTransactionsWithSimilarOrigins,
    currentTransactionsPage: transactions,
    loadCategories,
    categories,
  } = transactionsStore;
  // const categories = [
  //   {
  //     key: 1,
  //     text: "Home Expenses",
  //     value: 1,
  //   },
  //   {
  //     key: 2,
  //     text: "Transportation",
  //     value: 2,
  //   },
  //   {
  //     key: 3,
  //     text: "Food",
  //     value: 3,
  //   },
  //   {
  //     key: 4,
  //     text: "Clothing",
  //     value: 4,
  //   },
  //   {
  //     key: 5,
  //     text: "Healthcare",
  //     value: 5,
  //   },
  //   {
  //     key: 6,
  //     text: "Entertainment",
  //     value: 6,
  //   },
  //   {
  //     key: 7,
  //     text: "Education",
  //     value: 7,
  //   },
  //   {
  //     key: 8,
  //     text: "Savings",
  //     value: 8,
  //   },
  //   {
  //     key: 9,
  //     text: "Personal",
  //     value: 9,
  //   },
  // ];

  useEffect(() => {
    loadCategories();
  }, [transactionsStore]);

  return (
    <Table.Body>
      {transactions.map((transaction: ITransaction) => (
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
            <Dropdown
              text={
                transaction.categoryId ? Category[transaction.categoryId] : ""
              }
              defaultValue={transaction.categoryId ?? ""}
              onChange={(e, { value }) =>
                categorizeAllTransactionsWithSimilarOrigins(
                  transaction.id,
                  value
                )
              }
              fluid
              selection
              options={categories}
            />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  );
}

export default observer(TransactionsBody);

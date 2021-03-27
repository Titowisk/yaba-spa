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
    isUpdating,
  } = transactionsStore;

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
              loading={isUpdating}
              disabled={isUpdating}
            />
          </Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  );
}

export default observer(TransactionsBody);

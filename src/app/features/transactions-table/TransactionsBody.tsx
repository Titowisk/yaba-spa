import React from "react";
import { Dropdown, Table } from "semantic-ui-react";
import { ITransaction, Category } from "../../models/Transaction";

interface IProps {
  transactions: ITransaction[];
  UpdateTransactionsWithSimilarOrigin: (id: number, value: any) => void;
}

export const TransactionsBody: React.FC<IProps> = ({
  transactions,
  UpdateTransactionsWithSimilarOrigin,
}) => {
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
            {/* {transaction.category} */}
            <Dropdown
              text={Category[transaction.category]}
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
  );
};

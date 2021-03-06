import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Table } from "semantic-ui-react";
import agent from "../../api/agent";
import {
  ICategorizeUserTransactionsDTO,
  IGetByDateDTO,
} from "../../models/Transaction";
import { useStore } from "../../stores/store";
import TransactionsBody from "./TransactionsBody";
import TransactionsFooter from "./TransactionsFooter";

function TransactionsTable() {
  const { transactionsStore } = useStore();
  const {
    transactionRegistry: transactions,
    currentPage,
    pagesArray,
    loadTransactions,
    setCurrentPage,
  } = transactionsStore;

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
        <TransactionsBody />
        <TransactionsFooter />
      </Table>
    </div>
  );
}

export default observer(TransactionsTable);

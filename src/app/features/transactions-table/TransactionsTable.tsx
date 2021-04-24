import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button, ButtonGroup, Grid, GridRow, Table } from "semantic-ui-react";
import agent from "../../api/agent";
import {
  GetTransactionDatesDTO,
  ICategorizeUserTransactionsDTO,
  IGetByDateDTO,
} from "../../models/Transaction";
import { useStore } from "../../stores/store";
import TransactionsBody from "./TransactionsBody";
import TransactionsDateMenu from "./TransactionsDateMenu";
import TransactionsFooter from "./TransactionsFooter";

function TransactionsTable() {
  const { transactionsStore, userStore } = useStore();
  const {
    loadTransactions,
    loadTransactionDates,
    currentSelectedYear,
    currentSelectedMonth,
  } = transactionsStore;
  const { user } = userStore;
  // TODO: create endpoint to get categories of transaction

  // page was accessed for the first time
  useEffect(() => {
    console.log("First Acess");
    if (user === null) console.log("Nuuuuuuuuuuuuul"); // TODO: handle unauthorized user

    var body1: GetTransactionDatesDTO = { userId: user!.id, bankAccountId: 1 };
    loadTransactionDates({ userId: user!.id, bankAccountId: 9 }).then(() => {
      // let body: IGetByDateDTO = { bankAccountId: 9, year: 2020, month: 1 };
      loadTransactions({
        bankAccountId: 9,
        year: currentSelectedYear,
        month: currentSelectedMonth,
      });
    });
  }, [transactionsStore]);

  return (
    <div>
      <TransactionsDateMenu />

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

import { autorun, when } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Table } from "semantic-ui-react";
import agent from "../../api/agent";
import { GetTransactionDatesDTO } from "../../models/Transaction";
import { useStore } from "../../stores/store";
import TransactionsBody from "./TransactionsBody";
import TransactionsDateMenu from "./TransactionsDateMenu";
import TransactionsFooter from "./TransactionsFooter";

function TransactionsTable() {
  const { transactionsStore, userStore, bankAccountsStore } = useStore();
  const {
    loadTransactions,
    loadTransactionDates,
    currentSelectedYear,
    currentSelectedMonth,
  } = transactionsStore;
  const { user, isLoggedIn } = userStore;
  const { selectedBankAccountId } = bankAccountsStore;
  // TODO: create endpoint to get categories of transaction

  // page was accessed for the first time
  useEffect(() => {
    console.log(`useEffect: isLoggedIn: ${isLoggedIn}`);
    if (isLoggedIn) {
      loadTransactionDates({
        userId: user!.id,
        bankAccountId: selectedBankAccountId,
      }).then(() => {});
    } // TODO: handle unauthorized user
  }, [isLoggedIn]);

  useEffect(() => {
    if (currentSelectedMonth !== null && currentSelectedMonth > 0) {
      console.log(`useEffect: current month changed: ${currentSelectedMonth}`);
      loadTransactions({
        bankAccountId: selectedBankAccountId,
        year: currentSelectedYear,
        month: currentSelectedMonth,
      });
    }
  }, [currentSelectedMonth]);

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

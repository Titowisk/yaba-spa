import { autorun, when } from "mobx";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import {
  Dimmer,
  DimmerDimmable,
  Grid,
  GridColumn,
  GridRow,
  Loader,
  Table,
} from "semantic-ui-react";
import agent from "../../api/agent";
import { GetTransactionDatesDTO } from "../../models/Transaction";
import { useStore } from "../../stores/store";
import TransactionsBody from "./TransactionsBody";
import TransactionsDateMenu from "./TransactionsDateMenu";
import TransactionsFooter from "./TransactionsFooter";
import TransactionsSummary from "./TransactionsSummary";

function TransactionsTable() {
  const { transactionsStore, userStore, bankAccountsStore } = useStore();
  const {
    loadTransactions,
    loadTransactionDates,
    currentSelectedYear,
    currentSelectedMonth,
    loading,
  } = transactionsStore;
  const { user, isLoggedIn } = userStore;
  const { selectedBankAccountId } = bankAccountsStore;
  // TODO: create endpoint to get categories of transaction

  // page was accessed for the first time
  useEffect(() => {
    // console.log(`useEffect: isLoggedIn: ${isLoggedIn}`);
    if (isLoggedIn) {
      loadTransactionDates({
        userId: user!.id,
        bankAccountId: selectedBankAccountId,
      }).then(() => {});
    } // TODO: handle unauthorized user
  }, [isLoggedIn]);

  useEffect(() => {
    if (currentSelectedMonth !== null && currentSelectedMonth > 0) {
      // console.log(`useEffect: current month changed: ${currentSelectedMonth}`);
      loadTransactions({
        bankAccountId: selectedBankAccountId,
        year: currentSelectedYear,
        month: currentSelectedMonth,
      });
    }
  }, [currentSelectedMonth]);

  return (
    <div>
      <Grid columns={2}>
        <GridRow>
          <GridColumn width={8}>
            <TransactionsDateMenu />
          </GridColumn>
          <GridColumn width={8}>
            <DimmerDimmable blurring dimmed={loading}>
              <Dimmer active={loading}>
                <Loader />
              </Dimmer>
              <TransactionsSummary />
            </DimmerDimmable>
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn width={16}>
            <DimmerDimmable blurring dimmed={loading}>
              <Dimmer active={loading}>
                <Loader />
              </Dimmer>
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
            </DimmerDimmable>
          </GridColumn>
        </GridRow>
      </Grid>
    </div>
  );
}

export default observer(TransactionsTable);

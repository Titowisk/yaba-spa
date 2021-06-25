import { observer } from "mobx-react-lite";
import React from "react";
import { Button, ButtonGroup, Grid, GridColumn, GridRow } from "semantic-ui-react";
import { useStore } from "../../stores/store";

function TransactionsDateMenu() {
  const { transactionsStore } = useStore();
  const {
    setCurrentYear,
    setCurrentMonth,
    currentSelectedYear,
    currentSelectedMonth,
    transactionYears,
    monthsOfTransactionYear,
  } = transactionsStore;
  return (
    <div>
      <Grid columns={1}>
        <GridRow>
          <GridColumn>
            <ButtonGroup>
              {transactionYears.map((year) => (
                <Button
                  active={year === currentSelectedYear}
                  onClick={() => setCurrentYear(year)}
                >
                  {year}
                </Button>
              ))}
            </ButtonGroup>

          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn>
            <ButtonGroup>
              {monthsOfTransactionYear?.map((month) => (
                <Button
                  active={month === currentSelectedMonth}
                  onClick={() => setCurrentMonth(month)}
                >
                  {month}
                </Button>
              ))}
            </ButtonGroup>
          </GridColumn>
        </GridRow>
      </Grid>
    </div>
  );
}

export default observer(TransactionsDateMenu);

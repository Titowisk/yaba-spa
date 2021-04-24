import { observer } from "mobx-react-lite";
import React from "react";
import { Button, ButtonGroup, Grid, GridRow } from "semantic-ui-react";
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
      <Grid>
        <GridRow>
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
        </GridRow>
        <GridRow>
          <ButtonGroup>
            {monthsOfTransactionYear?.map((month) => (
              <Button
                active={month === currentSelectedMonth}
                onClick={() => setCurrentMonth(month)}
              >
                {month}
              </Button>
            ))}
            {/* <Button disabled>Jan</Button>
            <Button>Fev</Button>
            <Button>Mar</Button>
            <Button>Apr</Button>
            <Button>May</Button>
            <Button>Jun</Button>
            <Button>Jul</Button>
            <Button>Aug</Button>
            <Button>Sep</Button>
            <Button>Oct</Button>
            <Button>Nov</Button>
            <Button>Dec</Button> */}
          </ButtonGroup>
        </GridRow>
      </Grid>
    </div>
  );
}

export default observer(TransactionsDateMenu);

import { observer } from 'mobx-react-lite';
import React from 'react'
import { Grid, GridColumn, GridRow, Icon, Progress, Statistic } from 'semantic-ui-react';
import { useStore } from '../../stores/store';

function TransactionsSummary() {
  const { transactionsStore } = useStore();
  const {
    totalVolume,
    totalExpense,
    totalIncome,
    incomePercentage,
    expensePercentage
  } = transactionsStore;

  return (
  <div>
    <Grid columns={2}>
      <GridRow>
        <GridColumn width={8}>
        <Statistic size='small' color='green'>
          <Statistic.Value><Icon name='arrow up'/>{totalIncome}</Statistic.Value>
          <Statistic.Label>INCOME</Statistic.Label>
        </Statistic>
        </GridColumn>
        <GridColumn width={8}>
        <Statistic size='small' color='red'>
          <Statistic.Value><Icon name='arrow down'/>{totalExpense * -1}</Statistic.Value>
          <Statistic.Label>EXPENSE</Statistic.Label>
        </Statistic>
        </GridColumn>
      </GridRow>
      <GridRow>
        <GridColumn width={16}>
          <Progress color='green' size='small' percent={incomePercentage} progress='percent' />
          <Progress color='red' size='small' percent={expensePercentage} progress='percent' />
        </GridColumn>
      </GridRow>
    </Grid>
  </div>
  )

}

export default observer(TransactionsSummary);


import React, { Fragment } from 'react';

import { Container, Grid, GridColumn } from 'semantic-ui-react';

import { Nav } from '../features/nav/Nav';
import { SideNavBar } from '../features/sidenavbar/SideNavBar';
import { TransactionsTable } from '../features/transactions-table/TransactionsTable';

import './styles.css';


const App = () => {
  return (
    <Fragment>
      <Nav/>
      <Grid columns={2}>
        <GridColumn width={2}>
          <SideNavBar/>
        </GridColumn>
        <GridColumn columns={14} stretched width='14'>
          <Container style={{paddingTop: 30}}>
            <TransactionsTable/>
          </Container>
        </GridColumn>
      </Grid>
    </Fragment>
  );
}

export default App;

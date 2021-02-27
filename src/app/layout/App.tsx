import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Route } from "react-router-dom";

import { Container, Grid, GridColumn } from "semantic-ui-react";
import { HomePage } from "../features/home/HomePage";

import { Nav } from "../features/nav/Nav";
import { SideNavBar } from "../features/sidenavbar/SideNavBar";
import { TransactionsTable } from "../features/transactions-table/TransactionsTable";
import LoginUser from "../features/user/LoginUser";
import { RegisterUser } from "../features/user/RegisterUser";

import "./styles.css";

function App() {
  return (
    <Fragment>
      <Nav />
      <Grid columns={2}>
        <GridColumn width={2}>
          <SideNavBar />
        </GridColumn>
        <GridColumn columns={14} stretched width="14">
          <Container style={{ paddingTop: 30 }}>
            <Route exact path="/" component={HomePage} />
            <Route path="/transactions" component={TransactionsTable} />
            <Route path="/register-user" component={RegisterUser} />
            <Route path="/login-user" component={LoginUser} />
            {/* <Route path="/registerBank" component={RegisterBank} /> */}
          </Container>
        </GridColumn>
      </Grid>
    </Fragment>
  );
}

export default observer(App);

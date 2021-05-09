import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Card, Grid, GridColumn, Icon } from "semantic-ui-react";
import { BankAccount } from "../../models/BankAccount";
import { useStore } from "../../stores/store";

function BankMenu() {
  const { bankAccountsStore } = useStore();
  const { allBankAccounts, loadBankAccounts } = bankAccountsStore;

  useEffect(() => {
    loadBankAccounts();
  }, [bankAccountsStore]);

  return (
    <div>
      <Grid container columns={3}>
        {allBankAccounts.map((bankAccount: BankAccount) => (
          <GridColumn>
            <Button key={bankAccount.id}>
              <Card>
                <Card.Content header={bankAccount.bankName} />
                <Card.Content description={`Agency: ${bankAccount.agency}`} />
                <Card.Content
                  description={`Account Number: ${bankAccount.accountNumber}`}
                />
              </Card>
            </Button>
          </GridColumn>
        ))}
      </Grid>
    </div>
  );
}

export default observer(BankMenu);

import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Button, Card, Grid, GridColumn, Icon } from "semantic-ui-react";
import { BankAccount } from "../../models/BankAccount";
import { useStore } from "../../stores/store";

function BankMenu() {
  const { bankAccountsStore, userStore } = useStore();
  const {
    allBankAccounts,
    selectedBankAccountId,
    loadBankAccounts,
    setSelectedBankAccount,
  } = bankAccountsStore;

  const { isLoggedIn } = userStore;

  useEffect(() => {
    if (isLoggedIn) {
      loadBankAccounts();
    }
  }, [bankAccountsStore]);

  return (
    <div>
      <Grid container columns={3}>
        {allBankAccounts.map((bankAccount: BankAccount) => (
          <GridColumn>
            <Button
              active={selectedBankAccountId === bankAccount.id}
              key={bankAccount.id}
              onClick={() => setSelectedBankAccount(bankAccount.id)}
            >
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

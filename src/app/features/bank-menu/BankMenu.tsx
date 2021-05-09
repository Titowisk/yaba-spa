import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Card, Grid, GridColumn, Icon } from "semantic-ui-react";

function BankMenu() {
  return (
    <div>
      <Grid container columns={3}>
        <GridColumn>
          <Button>
            <Card>
              <Card.Content header="Bradesco" />
              <Card.Content description={"Agency: 1529"} />
              <Card.Content description={"Account Number: 0822056-6"} />
            </Card>
          </Button>
        </GridColumn>
        <GridColumn>
          <Button>
            <Card>
              <Card.Content header="About Amy" />
              <Card.Content description={"description"} />
              <Card.Content extra>
                <Icon name="user" />4 Friends
              </Card.Content>
            </Card>
          </Button>
        </GridColumn>
        <GridColumn>
          <Button>
            <Card>
              <Card.Content header="About Amy" />
              <Card.Content description={"description"} />
              <Card.Content extra>
                <Icon name="user" />4 Friends
              </Card.Content>
            </Card>
          </Button>
        </GridColumn>
        <GridColumn>
          <Button>
            <Card>
              <Card.Content header="About Amy" />
              <Card.Content description={"description"} />
              <Card.Content extra>
                <Icon name="user" />4 Friends
              </Card.Content>
            </Card>
          </Button>
        </GridColumn>
        <GridColumn>
          <Button>
            <Card>
              <Card.Content header="About Amy" />
              <Card.Content description={"description"} />
              <Card.Content extra>
                <Icon name="user" />4 Friends
              </Card.Content>
            </Card>
          </Button>
        </GridColumn>
      </Grid>
    </div>
  );
}

export default observer(BankMenu);

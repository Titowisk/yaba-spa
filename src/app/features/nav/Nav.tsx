import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Label, Menu } from "semantic-ui-react";
import { useStore } from "../../stores/store";

function Nav() {
  const { userStore } = useStore();
  return (
    <Fragment>
      <Menu>
        <Menu.Item as={Link} to="/" name="yaba" content="Yaba" />
        <Menu.Menu position="right">
          {userStore.isLoggedIn ? (
            <>
              <Menu.Item>
                <Label>
                  Bem Vindo!!
                  <Label.Detail>{userStore.user?.name}</Label.Detail>
                </Label>
              </Menu.Item>
              <Menu.Item>
                <Button basic color="red" onClick={() => userStore.logout()}>
                  Logout
                </Button>
              </Menu.Item>
            </>
          ) : (
            <>
              <Menu.Item>
                <Button as={NavLink} to="/login-user" secondary>
                  Login
                </Button>
              </Menu.Item>
              <Menu.Item>
                <Button as={NavLink} to="/register-user" primary>
                  Register
                </Button>
              </Menu.Item>
            </>
          )}
        </Menu.Menu>
      </Menu>
    </Fragment>
  );
}

export default observer(Nav);

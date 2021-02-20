import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button, Menu } from "semantic-ui-react";

export const Nav = () => {
  return (
    <div>
      <Menu>
        <Menu.Item as={Link} to="/" name="yaba" content="Yaba" />
        <Menu.Menu position="right">
          <Menu.Item>
            <Button secondary>Login</Button>
          </Menu.Item>
          <Menu.Item>
            <Button as={NavLink} to="/register-user" primary>
              Register
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
};

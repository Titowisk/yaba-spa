import React from 'react'
import { Button, Menu } from 'semantic-ui-react'

export const Nav = () => {
  return (
    <div>
      <Menu>
        <Menu.Item
          name='yaba'
          content='Yaba'
        />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Button secondary>Login</Button>
          </Menu.Item>
          <Menu.Item>
            <Button primary>Register</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  )
}

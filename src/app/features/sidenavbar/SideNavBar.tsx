import React from 'react'
import { Menu } from 'semantic-ui-react'

export const SideNavBar = () => {
  return (
    <div>
      <Menu pointing secondary vertical>
        <Menu.Item
          name='home'
        />
        <Menu.Item
          name='Register Bank'
        />
        <Menu.Item
          name='Transactions'
        />
      </Menu>
    </div>
  )
}
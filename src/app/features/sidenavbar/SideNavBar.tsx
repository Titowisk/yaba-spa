import React from 'react'
import { Menu } from 'antd';

export const SideNavBar = () => {
  return (
    <div>
      <Menu
        style={{ width: 256, minHeight: '100vh' }}
        mode="inline"
      >
        <Menu.ItemGroup key="register" title="Register">
            <Menu.Item key="register1">Bank</Menu.Item>
            <Menu.Item key="register2">Option 2</Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="view" title="View">
            <Menu.Item key="view1">Bank Account</Menu.Item>
            <Menu.Item key="view2">Transactions</Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    </div>
  )
}

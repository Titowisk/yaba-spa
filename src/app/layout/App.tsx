import React from 'react';
import { Nav } from '../features/nav/Nav';
import { SideNavBar } from '../features/sidenavbar/SideNavBar';
import { Layout } from 'antd';

import 'antd/dist/antd.css';
import './styles.css';

const { Header, Sider, Content } = Layout;

const App = () => {
  return (
    <div className="App">
      <Layout >
        <Header>
          <Nav/>
        </Header>
      <Layout>
        <Sider style={{ minHeight: '100vh' }}>
          <SideNavBar/>
        </Sider>
        <Content>Content</Content>
      </Layout>
    </Layout>
    </div>
  );
}

export default App;

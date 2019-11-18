import React from 'react';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Layout, Menu } from 'antd';

import './App.scss';

import Counter from '../Counter/Counter';

import Setting from '../Setting/Setting';

const App: React.FC = () => {
  const { Header, Footer, Content } = Layout;

  const hrefList = window.location.href.split('/');
  const currentKey = hrefList[hrefList.length - 1] || 'count';

  return (
    <Router>
      <Layout className="layout">
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={[currentKey]}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="count">
              Count
              <Link to="/" />
            </Menu.Item>
            <Menu.Item key="setting">
              Setting
              <Link to="/setting" />
            </Menu.Item>
          </Menu>
        </Header>

        <Content>
          <div className="content-area">
            <Route exact={true} path="/" component={Counter} />
            <Route path="/setting" component={Setting} />
          </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Router>
  );
};

export default App;

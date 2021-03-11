import React from 'react';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { Layout, Menu } from 'antd';

import './App.scss';

import Counter from '../Counter/Counter';

import Github from '../Github/Github';

import Setting from '../Setting/Setting';

import TrafficLight from '../TrafficLight/TrafficLight';

import FamilyTreeWrapper from '../FamilyTreeWrapper/FamilyTreeWrapper';

const App: React.FC = () => {
  const { Header, Footer, Content } = Layout;

  const hrefList = window.location.href.split('/');
  const currentKey = hrefList[hrefList.length - 1] || 'github';

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
              <Link to="/count" />
            </Menu.Item>
            <Menu.Item key="github">
              Github
              <Link to="/" />
            </Menu.Item>
            <Menu.Item key="setting">
              Setting
              <Link to="/setting" />
            </Menu.Item>
            <Menu.Item key="traffic-light">
              Traffic Light
              <Link to="/traffic-light" />
            </Menu.Item>
            <Menu.Item key="family-tree">
              Family Tree
              <Link to="/family-tree" />
            </Menu.Item>
          </Menu>
        </Header>

        <Content>
          <div className="content-area">
            <Route path="/count" component={Counter} />
            <Route exact={true} path="/" component={Github} />
            <Route path="/setting" component={Setting} />
            <Route path="/traffic-light" component={TrafficLight} />
            <Route path="/family-tree" component={FamilyTreeWrapper} />
          </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Router>
  );
};

export default App;

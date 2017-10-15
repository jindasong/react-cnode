import './layout.css';
import React, { Component } from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import { withRouter } from 'react-router-dom';
import queryStrign from 'query-string';
import Logo from '@assets/images/logo.svg';
const { Header, Content, Sider } = Layout;

class ViewLayout extends Component {
  constructor (...arg) {
    super(...arg);
    this.tabStrategy = {
      all: 'all',
      ask: 'ask',
      share: 'share',
      job: 'job',
      good: 'good'
    }
    this.state = {
      menuDefaultSelectedKeys: ['all']
    }
  }
  setMenuDefaultSelectedKeys (key) {
    if (!key) return;
    this.setState({
      menuDefaultSelectedKeys: [ key ]
    });
  }
  handleMenuClick ({ key }) {
    this.props.history.push({
      pathname: '/home',
      search: `?tab=${ this.tabStrategy[key] || 'all' }`
    });
  }
  componentWillMount () {
    this.setMenuDefaultSelectedKeys(queryStrign.parse(this.props.location.search).tab);
  }
  render () {
    return (
      <Layout>
        <Header className="header">
          <Row>
            <Col span={ 4 } className="logo">
              <img className="logo__img" src={ Logo } alt="logo"/>
            </Col>
            <Col span={ 18 } offset={ 2 }>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item key="5"> 注册</Menu.Item>
                <Menu.Item key="6"> 登录</Menu.Item>
              </Menu>
            </Col>
          </Row>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={ this.state.menuDefaultSelectedKeys }
              style={{ height: '100%', borderRight: 0 }}
              onClick={this.handleMenuClick.bind(this)}
            >
              <Menu.Item key="all">全部</Menu.Item>
              <Menu.Item key="ask">精华</Menu.Item>
              <Menu.Item key="share">分享</Menu.Item>
              <Menu.Item key="good">问答</Menu.Item>
              <Menu.Item key="job">招聘</Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              { this.props.children }
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(ViewLayout);
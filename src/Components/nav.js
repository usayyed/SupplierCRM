import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Menu } from 'element-react';

class Nav extends Component {
  onSelect(index) {
    if (index === "1") {
      this.props.history.push('/')
    } else if (index === "2") {
      this.props.history.push('/supplier-list')
    }
  }
  render() {
    return (
      <Menu theme="light" className="el-menu-demo" mode="horizontal" onSelect={this.onSelect.bind(this)}>
        <Menu.Item index="1"><img className="nav-img" src="/logo.jpg" alt="logo"/></Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(Nav);

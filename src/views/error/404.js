import React, { Component } from 'react';
import { Icon } from 'antd';
class Error404 extends Component {
  render () {
    return (
      <div>
        <Icon type="frown" /><span>页面找不到了...</span>
      </div>
    )
  }
}
export default Error404;
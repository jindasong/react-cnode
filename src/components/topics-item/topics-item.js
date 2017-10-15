import './topics-item.css';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Card, Tag } from 'antd';

class TopicsItem extends Component {
  render () {
    let { props } = this;
    return (
      <li className="topics-item">
        <Card
          title={ props.title }
          extra={ `发布时间：${props.date} 回复数：${ props.replyCount } 浏览数：${ props.visitCount }` }>
          <div className="topics-item__content">{ props.content }</div>
          <div className="topics-item__info">
            {
              props.tagText
                ? <Tag color={ props.tagColor || 'pink' }>{ props.tagText }</Tag>
                : ''
            }
            <Avatar src={ props.avatar } />
            <span>{ props.loginname }</span>
          </div>
        </Card>
      </li>
    )
  }
}

TopicsItem.propTypes = {
  avatar: PropTypes.string.isRequired,
  loginname: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default TopicsItem;
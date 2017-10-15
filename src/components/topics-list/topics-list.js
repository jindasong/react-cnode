import './topics-list.css';
import React, { Component } from 'react';

class TopicsList extends Component {
  render () {
    return (
      <ul className="topics-list">
        { this.props.children }
      </ul>
    )
  }
}

export default TopicsList;
import React, { Component } from 'react';
import Api from '@api';
import Layout from '@views/layout';
import {
  message,
  Card
} from 'antd';
import './details.css';

class Details extends Component {
  constructor (...arg) {
    super(...arg);
    this.state = {
      data: {
        author: {},
        title: '',
        content: ''
      }
    }
  }
  fetchTopicsDetails (id) {
    Api.topics.fetchDetails(id)
      .then(res => {
        this._isMounted && this.setState({
          data: res.data
        });
      })
      .catch(() => {
        message.error('请求错误');
      });
  }
  Replies () {
    let replies = this.state.data.replies || [];
    if (!replies || replies.length <= 0) return null;
    return (
      <div className="replies">
        <div className="replies__title">评论</div>
        <div className="replies__list">
          { replies.map((item, index) => {
             return (
               <div className="replies__item" key={ index }>
                 <Card>
                   <div dangerouslySetInnerHTML={{__html: item.content}} />
                 </Card>
               </div>
             )
          }) }
        </div>
      </div>
    );
  }
  Details () {
    let { data } = this.state;
    return (
      <div className="details">
        <h2 className="details__title">{ data.title }</h2>
        <div className="details__info">
          <span className='details__date'>发布时间：{ data.create_at }</span>
          <span className='details__name'>作者：{ data.author && data.author.loginname }</span>
        </div>
        <div dangerouslySetInnerHTML={{__html: data.content}} />
      </div>
    );
  }
  componentDidMount () {
    this._isMounted = true;
    let params = this.params = this.props.match.params;
    this.fetchTopicsDetails(params.id);
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render () {
    return (
      <Layout>
        { this.Details() }
        { this.Replies() }
      </Layout>
    )
  }
}

export default Details;
import React, { Component } from 'react';
import Layout from '@views/layout';
import Api from '@api';
import Moment from 'moment';
import Utils from '@utils';
import TopicsList from '@components/topics-list';
import TopicsItem from '@components/topics-item';
import QueryString from 'query-string';
import {
  Spin,
} from 'antd';

class Home extends Component {
  constructor (props) {
    super(props);
    this.topicsParams = {
      page: 1
    }
    this.state = {
      topicsList: [],
      isLoading: false
    }
  }
  componentDidMount () {
    this.init();
  }
  init () {
    this.setSearch(QueryString.parse(this.props.location.search));
    this.fetchTopicsList(this.topicsParams.page);
    this.bindEvent();
  }
  bindEvent () {
    this.scrollToBottomEvent();
  }
  scrollToBottomEvent () {
    function getScrollTop () {
      let scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
      if (document.body) {
        bodyScrollTop = document.body.scrollTop;
      }
      if (document.documentElement) {
        documentScrollTop = document.documentElement.scrollTop;
      }
      scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
      return scrollTop;
    }
    function getScrollHeight () {
      let scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
      if (document.body) {
        bodyScrollHeight = document.body.scrollHeight;
      }
      if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight;
      }
      scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
      return scrollHeight;
    }
    function getWindowHeight () {
      let windowHeight = 0;
      if (document.compatMode === "CSS1Compat") {
        windowHeight = document.documentElement.clientHeight;
      } else {
        windowHeight = document.body.clientHeight;
      }
      return windowHeight;
    }
    window.onscroll = () => {
      if(getScrollTop() + getWindowHeight() === getScrollHeight() && !this.state.isLoading){
        this.fetchTopicsList(++this.topicsParams.page);
      }
    };
  }
  setSearch (search) {
    this.search = search || {};
  }
  fetchTopicsList (page) {
    let tab = this.search.tab || '';
    if (this.state.isLoading) return;
    this.setState({
      isLoading: true
    });
    Api.topics.fetchList({
      params: {
        tab,
        page
      }
    })
      .then(res => {
        let { data } = res;
        this.setState({
          topicsList: page <= 1
            ? data
            : this.state.topicsList.concat(data),
          isLoading: false
        });
      })
      .catch(() => {
        this.setState({
          isLoading: false
        });
      });
  }
  render () {
    let formatTag = (tag) => {
      let tagMap = {
        share: {
          text: '分享',
          color: 'green'
        },
        ask: {
          text: '问答',
          color: 'blue'
        },
        job: {
          text: '招聘',
          color: 'purple'
        },
        good: {
          text: '精华',
          color: 'orange'
        },
      }
      return tagMap[tag] || {};
    }
    return (
      <Layout>
        <TopicsList>
          { this.state.topicsList.map((item, index) => {
            let tagObj = formatTag(item.tab);
            return (
              <TopicsItem
                key={ index }
                avatar={ item.author.avatar_url}
                loginname={ item.author.loginname }
                tagText={ tagObj.text }
                tagColor={ tagObj.color }
                title={ item.title }
                replyCount={ item.reply_count }
                visitCount={ item.visit_count }
                date={ Moment(item.create_at).format('YYYY-MM-DD HH:mm:SS') }
                content={ Utils.delHtmlTag(item.content).substr(0, 200) + '...'}>
              </TopicsItem>
            )
          }) }
        </TopicsList>
        {
          this.state.isLoading
            ? <Spin/>
            : ''
        }
      </Layout>
    );
  }
  componentWillReceiveProps (nextProps) {
    let nextSearch = nextProps.location.search;
    this.setSearch(QueryString.parse(nextSearch));
    if (nextSearch !== this.props.location.search) {
      let page = this.topicsParams.page = 1;
      this.fetchTopicsList(page);
    }
  }
}

export default Home;
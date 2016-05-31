import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import { LinkContainer } from 'react-router-bootstrap';

export default class Profile extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool,
  };

  render() {
    // const {posts, error, loading, load} = this.props;
    const {error, loading} = this.props;
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const styles = require('./Profile.scss');
    return (
      <div className={styles.fullHeight + ' container'}>
        <Helmet title="Profile"/>
        {error &&
        <div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          {' '}
          {error}
        </div>}

        <div className={styles.fullHeight + ' row'}>
          <div className={styles.userCard}>
            <img src="http://ww2.sinaimg.cn/crop.0.0.1080.1080.1024/d773ebfajw8eum57eobkwj20u00u075w.jpg" />
            <div className={styles.info}>昵称</div>
            <Glyphicon className={styles.ricon} glyph="menu-right"/>
          </div>

          <div className={styles.profileItems}>
            <ListGroup>
              <LinkContainer to="/posts"><ListGroupItem>我的订单</ListGroupItem></LinkContainer>
              <LinkContainer to="/posts"><ListGroupItem>我的收藏</ListGroupItem></LinkContainer>
            </ListGroup>
            <ListGroup>
              <LinkContainer to="/posts"><ListGroupItem>设置</ListGroupItem></LinkContainer>
              <LinkContainer to="/posts"><ListGroupItem>关于</ListGroupItem></LinkContainer>
            </ListGroup>
          </div>
        </div>
      </div>
    );
  }
}


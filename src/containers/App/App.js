import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { LinkContainer, IndexLinkContainer } from 'react-router-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import Helmet from 'react-helmet';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
// import { InfoBar } from 'components';
import { push } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    console.log('App');
    if (!isAuthLoaded(getState())) {
      promises.push(dispatch(loadAuth()));
    }

    return Promise.all(promises);
  }
}])
@connect(
  state => ({user: state.auth.user}),
  {logout, pushState: push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>

        <Navbar fixedBottom>
          <Nav className={styles.nav} bsStyle="pills" activeKey={1}>
            <IndexLinkContainer to="/">
              <NavItem eventKey={1}>
                <div><Glyphicon glyph="home"/></div>
                首页
              </NavItem>
            </IndexLinkContainer>
            <LinkContainer to="/posts">
              <NavItem eventKey={2}>
                <div><Glyphicon glyph="usd"/></div>
                资讯
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/profile">
              <NavItem eventKey={3}>
                <div><Glyphicon glyph="user"/></div>
                我的
              </NavItem>
            </LinkContainer>
          </Nav>
        </Navbar>

        <div className={styles.appContent}>
          {this.props.children}
        </div>

      </div>
    );
  }
}

import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as postActions from 'redux/modules/posts';
import {isLoaded, load as loadPosts} from 'redux/modules/posts';
import {initializeWithKey} from 'redux-form';
import { asyncConnect } from 'redux-async-connect';
import Panel from 'react-bootstrap/lib/Panel';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!isLoaded(getState())) {
      return dispatch(loadPosts());
    }
  }
}])
@connect(
  state => ({
    posts: state.posts.data,
    editing: state.posts.editing,
    error: state.posts.error,
    loading: state.posts.loading
  }),
  {...postActions, initializeWithKey })
export default class Posts extends Component {
  static propTypes = {
    posts: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    initializeWithKey: PropTypes.func.isRequired,
    editing: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
    editStart: PropTypes.func.isRequired
  };

  render() {
    /**
    const handleEdit = (post) => {
      const {editStart} = this.props; // eslint-disable-line no-shadow
      return () => editStart(String(post.id));
    };
    */
    const {error, loading, load} = this.props;
    // const {posts, error, loading, load} = this.props;
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const styles = require('./Posts.scss');
    return (
      <div className={styles.posts + ' container'}>
        <h1>
          <button className={styles.refreshBtn + ' btn btn-success'} onClick={load}>
            <i className={refreshClassName}/> {' '} Reload Posts
          </button>
        </h1>
        <Helmet title="Posts"/>
        {error &&
        <div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          {' '}
          {error}
        </div>}

        <div>
          <Panel>
            iAnim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
            Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
          </Panel>
          <Panel>
            iAnim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
            Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
          </Panel>
          <Panel>
            iAnim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
            Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
          </Panel>
          <Panel>
            iAnim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
            Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
          </Panel>
          <Panel>
            iAnim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
            Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
          </Panel>
          <Panel>
            iAnim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
            Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
          </Panel>
        </div>

      </div>
    );
  }
}


import superagent from 'superagent';
import config from '../config';
import cookie from 'react-cookie';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;

  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    return 'http://' + config.apiHost + ':' + config.apiPort + config.apiPrefix + adjustedPath;
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  return config.apiPrefix + adjustedPath;
}

export default class ApiClient {
  constructor() {
    methods.forEach((method) =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        console.log('apiclient entry');
        const request = superagent[method](formatUrl(path));
        console.log('send request ' + formatUrl(path));
        if (params) {
          request.query(params);
        }
        console.log('server: ' + __SERVER__);
        console.log('access:' + path);

        // if (__SERVER__ && req.get('cookie')) {
        //  request.set('cookie', req.get('cookie'));
        // }
        if (cookie && cookie.load('token')) {
          request.set('authorization', 'Bearer ' + cookie.load('token'));
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { status, body } = {}) => {
          if (status === 401 && cookie && cookie.load('token')) {
            // console.log(cookie.load('token'));
            // refresh token
            const refreshReq = superagent.get(formatUrl('/refresh_token'));
            refreshReq.set('authorization', 'Bearer ' + cookie.load('token'));
            refreshReq.end((err2, { status: status2, body: body2 } = {}) => {
              if (err2) {
                console.log('refresh error ' + status2);
                cookie.remove('token');
                cookie.remove('user');
                return err ? reject(status, body) : resolve(body);
              }
              console.log('refresh token ok');
              if (body2.token) {
                cookie.save('token', body2.token);
              }
              // retry
              const retryReq = superagent[method](formatUrl(path));
              if (params) {
                retryReq.query(params);
              }
              retryReq.set('authorization', 'Bearer ' + cookie.load('token'));
              retryReq.end((err3, { status: status3, body: body3 } = {}) => {
                return err3 ? reject(status3, body3) : resolve(body3);
              });
            });
          } else {
            return err ? reject(status, body) : resolve(body);
          }
        });
      }));
  }

  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  empty() {}
}

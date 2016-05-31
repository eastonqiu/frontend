import superagent from 'superagent';
import config from '../config';
import cookie from 'react-cookie';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  // if (__SERVER__) {
  // Prepend host and port of the API server to the path.
  // let host = "http://api.qqm.lingyunstrong.com";

  // return host + config.apiPrefix + adjustedPath;
  return 'http://' + config.apiHost + ':' + config.apiPort + config.apiPrefix + adjustedPath;
  // }
  // Prepend `/api` to relative URL, to proxy to API server.
  // return '/api' + adjustedPath;
}

export default class ApiClient {
  constructor() {
    methods.forEach((method) =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));

        if (params) {
          request.query(params);
        }
        console.log('access:' + path);

        // if (__SERVER__ && req.get('cookie')) {
        //  request.set('cookie', req.get('cookie'));
        // }
        if (cookie && cookie.load('token')) {
          console.log('cookie:' + cookie.load('token'));
          request.set('authorization', 'Bearer ' + cookie.load('token'));
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { status, headers, body } = {}) => {
          // console.log(status);
          // if (status === 401) {
          //   window.location.pathname = '/login';
          // }
          if (headers && headers.authorization) {
            // console.log('has refresh');
            // console.log(headers.authorization);
            cookie.save('token', headers.authorization);
          }
          return err ? reject(status, body) : resolve(body);
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

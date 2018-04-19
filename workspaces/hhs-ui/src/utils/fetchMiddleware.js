import { omit, pick } from "lodash";
import statuses from "statuses";

export const REQUEST_STATUS = "request";
export const SUCCESS_STATUS = "success";
export const FAILURE_STATUS = "failure";

class Thunks {
  constructor(type = "", props = {}) {
    this.requestType = `${type}_REQUEST`;
    this.successType = `${type}_SUCCESS`;
    this.failureType = `${type}_FAILURE`;
    this.props = props;
  }
  request() {
    return {
      type: this.requestType,
      fetchStatus: REQUEST_STATUS,
      ...this.props
    };
  }
  success(data) {
    return {
      type: this.successType,
      fetchStatus: SUCCESS_STATUS,
      data,
      ...this.props
    };
  }
  failure(error) {
    return {
      type: this.failureType,
      fetchStatus: FAILURE_STATUS,
      error,
      ...this.props
    };
  }
}

const DEFAULT_HANDLERS = {
  response: response => response.json(),
  success: json => json,
  failure: error => error
};

const ERROR_MESSAGES = {
  204: "The server has successfully fulfilled the request but no content was found."
};

const fetchMiddleware = ({ dispatch }) => next => action => {
  if (!action.request) {
    return next(action);
  }

  if (!(action.request instanceof Request)) {
    console.error(
      "`request` must be a Request object. See https://developer.mozilla.org/en-US/docs/Web/API/Request."
    );
    return next(action);
  }

  const keys = [...Object.keys(DEFAULT_HANDLERS), "type", "request"];
  const { type, request, ...actionHandlers } = pick(action, keys);
  const handlers = { ...DEFAULT_HANDLERS, ...actionHandlers };
  const thunks = new Thunks(type, omit(action, keys));

  dispatch(thunks.request());
  return fetch(request, { credentials: "include" })
    .then(response => {
      /**
       * Shorthand to check for an HTTP 2xx response status.
       * See https://fetch.spec.whatwg.org/#dom-response-ok
       */
      if (response.ok) {
        if (ERROR_MESSAGES[response.status]) {
          throw new Error(response.statusText);
        }

        return handlers.response(response);
      }

      /**
       * Raise an exception to reject the promise and trigger the outer .catch() handler.
       * By default, an error response status (4xx, 5xx) does NOT cause the promise to reject!
       */
      throw Error(response.statusText);
    })
    .then(data => {
      return dispatch(thunks.success(handlers.success(data)));
    })
    .catch(({ message, stack }) => {
      const status = statuses[message];
      const error = {
        message,
        stack: ERROR_MESSAGES[status] || stack
      };
      return dispatch(thunks.failure(handlers.failure(error)));
    });
};

export default fetchMiddleware;

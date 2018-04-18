import logger from "redux-logger";
import thunk from "redux-thunk";

const middleware = [thunk];

const getStoreMiddleware = () => {
  switch (process.env.NODE_ENV) {
    case "development":
      return [...middleware, logger];
    default:
      return middleware;
  }
};

export default getStoreMiddleware();

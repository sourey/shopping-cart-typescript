import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import productReducer from "../ducks/productsDuck";

const rootReducer = productReducer;
const allStoreEnhancers = compose(
  applyMiddleware(thunk),
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(rootReducer, allStoreEnhancers);

export default store;

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import productReducer from "../ducks/productsDuck";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
    key: 'root',
    storage,
  }
  
const rootReducer = productReducer;

const persistedReducer = persistReducer(persistConfig, rootReducer)

const allStoreEnhancers = compose(
  applyMiddleware(thunk),
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

// const store = createStore(rootReducer, allStoreEnhancers);
const store = createStore(persistedReducer, allStoreEnhancers)
const persistor = persistStore(store)


 export {store,persistor};

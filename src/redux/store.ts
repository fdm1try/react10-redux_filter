import { combineReducers, legacy_createStore } from 'redux';
import { itemListReducer, filterReducer } from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension'

export const configureStore = () => legacy_createStore(
  combineReducers({
    itemList: itemListReducer,
    filter: filterReducer,
  }), 
  composeWithDevTools()
);

export default configureStore;
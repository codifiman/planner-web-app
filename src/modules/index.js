import { combineReducers } from 'redux';

// Reducers
import { reducer as account } from './account';
import { reducer as shopping_lists } from './shopping_lists';
import { reducer as shopping_list_items } from './shopping_list_items';

// Root reducer
export const rootReducer = combineReducers({
  account,
  shopping_lists,
  shopping_list_items,
});

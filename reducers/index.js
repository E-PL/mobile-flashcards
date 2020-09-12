/*
* Root reducer
*/

import { combineReducers } from 'redux';
// Inport reducers
import decks from './decks';


// Combine reducers
export default combineReducers({
  decks,
});
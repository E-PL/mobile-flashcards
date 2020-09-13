/*
* Root reducer
*/

import { combineReducers } from 'redux';
// Inport reducers
import decks from './decks';
import quizTime from './quizTime'

// Combine reducers
export default combineReducers({
  decks,
  quizTime,
});
/*
* Quiz time actions
*/

// Actions type
export const SET_TIME = 'SET_TIME';

// Action creator
export function setQuizTime(time) {
    return {
      type: SET_TIME,
      time
    };
  }

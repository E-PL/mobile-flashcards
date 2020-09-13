/*
* Quiz time actions
*/

// Actions types

export const SET_TIME = 'SET_TIME';


export function setQuizTime(time) {
    return {
      type: SET_TIME,
      time
    };
  }

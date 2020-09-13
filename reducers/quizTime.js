/*
 * Quiz time reducer
 */

// Inport action types
import { SET_TIME } from "../actions/quizTime";

export default function quizTime(state = {time: 1}, action) {
  switch (action.type) {
    case SET_TIME:
      return { ...action.time };

    default:
      return {
        ...state,
      };
  }
}

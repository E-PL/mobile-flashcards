/*
 * Quiz time reducer
 */

// Inport action types
import { SET_TIME } from "../actions/quizTime";

export default function quizTime(state = new Date(0), action) {
  switch (action.type) {
    case SET_TIME:
      return action.time;

    default:
      return {
        ...state,
      };
  }
}

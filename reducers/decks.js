/*
 * Decks reducer
 */

// Inport action types
import { ADD_DECK, DELETE_DECK } from "../actions/decks";
import { ADD_CARD } from "../actions/decks";

export default function decks(state = {}, action) {
  switch (action.type) {
    case ADD_DECK:
      return {
        ...state,
        [action.id]: {
          id: action.id,
          name: action.name,
          cards: {},
        },
      };
    case ADD_CARD:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          cards: {
            ...state[action.deckId].cards,
            [action.id]: {
              id: action.id,
              question: action.question,
              answer: action.answer,
            },
          },
        },
      };
    case DELETE_DECK:
      const filteredState = Object.keys(state)
        .filter((key) => {
          return key != action.deckId;
        })
        .reduce((obj, key) => {
          return (obj[key] = state[key]), obj;
        }, {});
      return filteredState;

    default:
      return {
        ...state,
      };
  }
}

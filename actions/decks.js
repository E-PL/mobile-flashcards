/*
* Decks actions
*/

// Actions types

export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';
export const DELETE_DECK = 'DELETE_DECK';




export function addDeck(deck) {
    return {
      type: ADD_DECK,
      id: deck.id,
      name: deck.name
    };
  }

export function addCard(card) {
    return {
      type: ADD_CARD,
      deckId: card.deckId,
      id: card.id,
      question: card.question,
      answer: card.answer
    };
  }
export function deleteDeck(deckId) {
    return {
      type: DELETE_DECK,
      deckId
    };
  }
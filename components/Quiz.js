import React, { useState, useEffect } from "react";
import { Text, Button, SafeAreaView, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
// import action
import { setQuizTime } from "../actions/quizTime";

/**
 * Quiz component
 *
 * @description The Quiz component get the deck id to quiz from react route params, it saves the time of last quiz to redux store and renders the quiz.
 * @export Component
 * @param {Object} { route, navigation } React Navigation props
 * @returns Children components
 */
export default function Quiz({ route, navigation }) {
  // Grab dispatch
  const dispatch = useDispatch();

  // save to Redux store the time a new card is shown to trigger notifications after one day from that moment
  useEffect(() => {
    const time = { time: +new Date() };
    dispatch(setQuizTime(time));
  }, [currentCard]);

  // Get deck id and name via route param
  const deckID = route.params.id;

  // Using that id, get the deck object from Redux store
  const deck = useSelector((state) => state.decks[deckID]);

  // Make a copy of the card object as array of objects in the component state
  // I'm using component state for all quiz data, as it shoudn't persist over app reloads or view changes
  const cardsList = Object.keys(deck.cards).map((cardID) => {
    return deck.cards[cardID];
  });

  // Save that copy to component state
  const [unansweredCards, setUnansweredCards] = useState(cardsList);

  // Pick the first card of the array to begin with and save it to component state
  const [currentCard, setCurrentCard] = useState(unansweredCards[0]);

  // Keep track of user score in component state
  const [score, incrementScore] = useState(0);

  // When the user submit a correct answer result, increment score and show a new card
  function handleCorrectAnswer() {
    incrementScore(score + 1);
    nextQuestion();
  }
  // When the user submit an incorrect answer result, show a new card
  function handleIncorrectAnswer() {
    nextQuestion();
  }

  // Show a new card
  function nextQuestion() {
    // Remove the answered card from the unanswered array
    const filteredCards = unansweredCards;
    filteredCards.shift();
    // Update the unanswered cards array in component state
    setUnansweredCards(filteredCards);
    // Pick a new card to display
    setCurrentCard(unansweredCards[0]);
  }

  // When the user tap the show answer button, set a property named showAnswer on currentCard component state variable with a true value
  function handleShowAnswer() {
    setCurrentCard({
      ...currentCard,
      showAnswer: true,
    });
  }

  // If the unanswered cards array is empty and the deck have questions, it means that the quiz is finished, so renders quiz results
  if (unansweredCards.length === 0 && Object.keys(deck.cards).length != 0) {
    return (
      <SafeAreaView
        style={{
          width: "80%",
          textAlign: "center",
          justifyContent: "center",
          justifyItems: "center",
          alignContent: "center",
          alignItems: "center",
          alignSelf: "center",
          flex: 1,
        }}
      >
        <Text style={{ fontSize: 32 }}>The quiz is over</Text>

        <Text style={{ fontSize: 20, textAlign: "center" }}>
          You scored {score} correct answers over{" "}
          {Object.keys(deck.cards).length} questions
        </Text>
        {Object.keys(deck.cards).length === score && (
          <Text style={{ textAlign: "center" }}>Perfect!</Text>
        )}
        {score === 0 && (
          <Text style={{ textAlign: "center" }}>
            You can do better, try again!
          </Text>
        )}
        {Object.keys(deck.cards).length / 2 <= score &&
          Object.keys(deck.cards).length != score && (
            <Text style={{ textAlign: "center" }}>
              You are halfway to perfection!
            </Text>
          )}
      </SafeAreaView>
    );
  }

  // If the deck have no cards, tell the user to add some, if the deck have cards, render the quiz
  return Object.keys(deck.cards).length === 0 ? (
    <SafeAreaView
      style={{
        width: "80%",
        margin: "auto",
        justifyContent: "center",
        alignContent: "center",
        alignSelf: "center",
        flex: 1,
      }}
    >
      <Text>There aren't any questions to answer...</Text>
      <Text>Add some questions cards to the deck and try again!</Text>
    </SafeAreaView>
  ) : (
    <SafeAreaView
      style={{
        width: "80%",
        margin: "auto",
        justifyContent: "center",
        alignContent: "center",
        alignSelf: "center",
        flex: 1,
        textAlign: "center",
      }}
    >
      <Text style={{ fontSize: 18, textAlign: "center" }}>
        {currentCard.question}
      </Text>
      <Text style={{ fontSize: 18, textAlign: "center" }}>?</Text>
      {currentCard.showAnswer ? (
        <Text style={{ fontSize: 18, textAlign: "center" }}>
          {currentCard.answer}
        </Text>
      ) : (
        <View style={{ margin: 10 }}>
          <Button
            onPress={() => handleShowAnswer()}
            title="Show answer"
          ></Button>
        </View>
      )}
      <View style={{ margin: 10 }}>
        <Button onPress={() => handleCorrectAnswer()} title="Correct"></Button>
      </View>
      <View style={{ margin: 10 }}>
        <Button
          onPress={() => handleIncorrectAnswer()}
          title="Incorrect"
        ></Button>
      </View>
      <Text style={{ fontSize: 18, textAlign: "center" }}>
        Answered {Object.keys(deck.cards).length - unansweredCards.length} of{" "}
        {Object.keys(deck.cards).length} questions
      </Text>
    </SafeAreaView>
  );
}

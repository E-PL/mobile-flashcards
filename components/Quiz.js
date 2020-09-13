import React, { useState, useEffect } from "react";
import { Text, View, Button, SafeAreaView, TextInput } from "react-native";
// fix Text strings must be rendered within a text component
import "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid/async/index.native";
// import action
import { setQuizTime } from '../actions/quizTime' 


// Component loaded in deck view, aka when the user select or create e deck
export default function Quiz({ route, navigation }) {
    const dispatch = useDispatch();
  
    // save to redux store the time a new card is shown to trigger notifications after one day from that moment
    useEffect(() => {
        const time = + new Date();
        console.log(time);
        dispatch(setQuizTime(time));
      }, [currentCard]);
  
  
    console.log("route");
  console.log(route);
  // I'm passing the deck id and name via route param
  const deckID = route.params.id;
  console.log("deck");
  console.log(deckID);

  const deck = useSelector((state) => state.decks[deckID]);
  console.log(deck.cards, "inquiz deck");
  console.log(Object.keys(deck.cards).length, "lenght");

  // make a copy of the card object as array of objects in the component state
  const cardsList = Object.keys(deck.cards).map((cardID) => {
    return deck.cards[cardID];
  });

  const [unansweredCards, setUnansweredCards] = useState(cardsList);

  // Pick the first card of the array to begin with and save it to component state
  const [currentCard, setCurrentCard] = useState(unansweredCards[0]);

  console.log(unansweredCards, "unanswered cards");

  // keep track of user score, I'm using component state for all quiz data, as it shoudn't persist over app reloads or view changes
  const [score, incrementScore] = useState(0);

  function nextQuestion() {
    //   check if the quiz is over
console.log(unansweredCards, 'OOOOOOOO')
console.log(unansweredCards, unansweredCards.length)



    // remove the answered card from the unanswered array
    const filteredCards = unansweredCards;
    filteredCards.shift();

    setUnansweredCards(filteredCards);
    // Pick a new random card

    setCurrentCard(unansweredCards[0]);
  }

  function handleCorrectAnswer() {
    incrementScore(score + 1);
    nextQuestion();
  }

  function handleIncorrectAnswer() {
    nextQuestion();
  }

  function handleShowAnswer() {
    setCurrentCard({
      ...currentCard,
      showAnswer: true,
    });
  }
  function navigateToDeckView() {
    navigation.push("Deck", { id: deckID });
  }

  if (unansweredCards.length === 0) {
    return (
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
        <Text>The quiz is over</Text>

        <Text>
          You scored {score} correct answers over{" "}
          {Object.keys(deck.cards).length} questions
        </Text>
        {Object.keys(deck.cards).length === score && <Text>Perfect!</Text>}
        {score === 0 && <Text>You can do better, try again!</Text>}
        {Object.keys(deck.cards).length / 2 <= score &&
          Object.keys(deck.cards).length != score && (
            <Text>You are halfway to perfection!</Text>
          )}
      </SafeAreaView>
    );
  }

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
      }}
    >
      <Text>{currentCard.question}</Text>
      <Text>?</Text>
      {currentCard.showAnswer ? (
        <Text>{currentCard.answer}</Text>
      ) : (
        <Button onPress={() => handleShowAnswer()} title="Show answer"></Button>
      )}

      <Button onPress={() => handleCorrectAnswer()} title="Correct"></Button>
      <Button
        onPress={() => handleIncorrectAnswer()}
        title="Incorrect"
      ></Button>
      <Text>
        Answered {Object.keys(deck.cards).length - unansweredCards.length} of{" "}
        {Object.keys(deck.cards).length} questions
      </Text>
    </SafeAreaView>
  );
}

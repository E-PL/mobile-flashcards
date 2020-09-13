import React, { useState, useEffect } from "react";
import { Text, Button, SafeAreaView, TextInput } from "react-native";
import { useDispatch } from "react-redux";
// Import random id generator
import { nanoid } from "nanoid/async/index.native";
// Import action
import { addCard as saveCard } from "../actions/decks";

// Component loaded in deck view, aka when the user select or create e deck
/**
 * AddCards component
 *
 * @description The AddCard component add cards to a deck. The deck id is passed through navigation props.
 * @export Component
 * @param {Object} { route, navigation } React Navigation props
 * @returns Children components
 */
export default function AddCards({ route, navigation }) {
  // Store the random id to local state
  const [id, saveID] = useState("");

  // When component mounts, generate a random id for the card
  useEffect(() => {
    const id = nanoid().then((id) => {
      saveID(id);
    });
  }, []);

  // Grab dispatch
  const dispatch = useDispatch();

  // I'm passing the deck id and name via route param
  const deckID = route.params.id;

  // Save the TextInputs values to local state
  const [cardQuestion, saveCardQuestion] = useState("");
  const [cardAnswer, saveCardAnswer] = useState("");

  // When the user submit the card dispatch the action to add it to Redux store and render the Deck component passing it the newly created deck id as route param.
  function handleAddCard() {
    // Create the card object
    const card = {};
    card.deckId = deckID;
    card.id = id;
    card.question = cardQuestion;
    card.answer = cardAnswer;
    // Dispatch action
    dispatch(saveCard(card));
    // Return to deck view
    navigation.push("Deck", { id: deckID });
  }

  return (
    <>
      <Text style={{ fontSize: 16, textAlign: "center", margin: 5 }}>
        Write question and answer to add
      </Text>
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
        <TextInput
          style={{
            height: 30,
            width: "100%",
            borderColor: "lightblue",
            borderWidth: 1,
            marginBottom: 10,
          }}
          onChangeText={(text) => saveCardQuestion(text)}
          value={cardQuestion}
          blurOnSubmit={true}
        />
        <TextInput
          style={{
            height: 30,
            width: "100%",
            borderColor: "lightblue",
            borderWidth: 1,
            marginBottom: 10,
          }}
          onChangeText={(text) => saveCardAnswer(text)}
          value={cardAnswer}
          blurOnSubmit={true}
        />
        <Button onPress={() => handleAddCard()} title="Submit"></Button>
      </SafeAreaView>
    </>
  );
}

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Text, TextInput, Button, SafeAreaView } from "react-native";
// React navigation community solution inports


// Actions
import { addDeck } from "../actions/decks";
//  Nano ID for random string generation
import { nanoid } from "nanoid/async/index.native";

/**
 * AddDeck
 *
 *
 * @description The AddDeck component renders a TextInput for the deck name, call nano ID to generate a random id and save the new deck to Redux store.
 * @export Component
 * @param {*} { navigation } Navigation prop from react-navigation
 * @returns Children components
 */
export default function AddDeck({ navigation }) {
  // Store the random id to local state
  const [id, saveID] = useState("");

  // Track deck saves to change the random id after a deck is saved
  const [decksSaved, incrementSavedDecks] = useState(0);

  // Get a new random id at component mount and after the action to save the deck in Redux store is dispatched
  useEffect(() => {
    const id = nanoid().then((id) => {
      saveID(id);
    });
  }, [decksSaved]);

  // Grab dispatch
  const dispatch = useDispatch();

  // Save the TextInput value to local state
  // TODO: sanitize user input before passing it to reducers or props before going to prod
  const [deckName, saveDeckName] = useState("");

  // Handle submit button tap
  function handleSubmitDeck() {
    // Create the deck object to dispatch
    const deck = {};
    deck.id = id;
    deck.name = deckName;

    // Save deck in Redux store
    dispatch(addDeck(deck));

    // Increment the saved deck counter in state to trigger the useEffect hook that generates random ids
    incrementSavedDecks(decksSaved + 1);

    // Reset the text area content
    saveDeckName("");
    // Redirect to the Deck view passing the new id as route param
    navigation.navigate("Deck", { id: deck.id });
  }
  return (
    <>
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
        <Text>Choose a name for your new deck:</Text>

        <TextInput
          style={{
            height: 30,
            width: "100%",
            borderColor: "lightblue",
            borderWidth: 1,
            marginBottom: 10,
          }}
          onChangeText={(text) => saveDeckName(text)}
          value={deckName}
          onSubmitEditing={() => handleSubmitDeck()}
          autoFocus={true}
          blurOnSubmit={true}
        />
        <Button onPress={() => handleSubmitDeck()} title="Submit"></Button>
      </SafeAreaView>
    </>
  );
}

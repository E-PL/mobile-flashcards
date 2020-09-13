import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, View, Button, BackHandler } from "react-native";
// customize back button, we don't want to get the user back to the deck creation screen when using hardware back button
import { useFocusEffect } from "@react-navigation/native";
//import action
import { deleteDeck } from "../actions/decks";

// Component loaded in deck view, aka when the user select or create e deck
/**
 * Deck component
 *
 * @description The Deck component is rendered when the user select a deck or after deck creation. The deck id is passed by react navigation props
 * @export Component
 * @param {Object} { route, navigation } React Navigation props
 * @returns
 */
export default function Deck({ route, navigation }) {
  // Grab dispatch
  const dispatch = useDispatch();

  // If the user hit the Android hardware button, navigate to the decks list tab and not to the previous screen in the stack
  // The software button is handled by Stack Screen options in App.js
  // See https://reactnavigation.org/docs/custom-android-back-button-handling/
  useFocusEffect(
    React.useCallback(() => {
      const goBack = () => {
        navigation.popToTop();
      };
      BackHandler.addEventListener("hardwareBackPress", goBack);
      return () => BackHandler.removeEventListener("hardwareBackPress", goBack);
    }, [])
  );

  // Get deck id and name from route parameters
  const deckID = route.params.id;

  // Get the deck object with the provided id from Redux store
  const storedDeck = useSelector((state) => state.decks[deckID]);

  // When the user taps on the add card button, render the AddCards component and pass it the deck id via route param
  function handleAddCards() {
    navigation.push("New Question", { id: deckID });
  }
  // When the user taps on the take quiz button render the Quiz component passing the deck id via route params
  function handleTakeQuiz() {
    navigation.push("Take quiz", { id: deckID });
  }

  // When the user taps on the delete deck button, dispatch the action to delete the deck from Redux store and render the DecksList component
  function handleDelete() {
    dispatch(deleteDeck(deckID));
    navigation.navigate("Decks");
  }

  // If the deck object is undefined, render nothing.
  if (!storedDeck) {
    return null;
  }

  return (
    <View
      style={{
        justifyContent: "center",
        alignContent: "center",
        alignSelf: "center",
        flex: 1,
      }}
    >
      <Text
        style={{
          justifyContent: "center",
          alignContent: "center",
          alignSelf: "center",
          fontSize: 32,
          padding: 10,
        }}
      >
        {storedDeck.name}
      </Text>

      <Text
        style={{
          justifyContent: "center",
          alignContent: "center",
          alignSelf: "center",
          fontSize: 20,
          padding: 10,
        }}
      >
        Number of cards:
      </Text>
      <Text
        style={{
          justifyContent: "center",
          alignContent: "center",
          alignSelf: "center",
          fontSize: 20,
          padding: 10,
        }}
      >
        {Object.keys(storedDeck.cards).length}
      </Text>
      <View style={{ margin: 10 }}>
        <Button onPress={() => handleTakeQuiz()} title="Take the quiz"></Button>
      </View>
      <View style={{ margin: 10 }}>
        <Button onPress={() => handleAddCards()} title="Add cards"></Button>
      </View>
      <View style={{ margin: 10 }}>
        <Button
          color="red"
          onPress={() => handleDelete()}
          title="Delete"
        ></Button>
      </View>
    </View>
  );
}

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Text, View, TextInput, Button, SafeAreaView } from "react-native";
// React navigation community solution inports
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
// Icons
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// Actions
import { addDeck } from "../actions/decks";
//  Nano ID
import { nanoid } from "nanoid/async/index.native";


async function getRandomID() {
  const id = await nanoid();
}

export default function AddDeck({ navigation }) {
  const [id, saveID] = useState("");
  const [decksSaved, incrementSavedDecks] = useState(0);

  useEffect(() => {
    const id = nanoid().then((id) => {
      saveID(id);
    });
  }, [decksSaved]);

  const dispatch = useDispatch();

  const [deckName, saveDeckName] = useState("");

  function handleSubmitDeck() {
    // Update store
    const name = deckName;

    const deck = {};
    deck.id = id;
    deck.name = deckName;

    dispatch(addDeck(deck));

    // get another random id for the next new deck incrementing the saved deck counter in state passed in the optional hook array
    // the counter changes, the hook gets executed again and save another random string to state.
    incrementSavedDecks(decksSaved + 1);

    // Reset the text area content
    saveDeckName('');
    // Redirect to the new deck view
    console.log(deckName);
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

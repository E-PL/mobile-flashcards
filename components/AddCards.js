// TODO sanitize user input before passing it to reducers or props
import React, { useState, useEffect } from "react";
import { Text, View, Button, SafeAreaView, TextInput } from "react-native";
// fix Text strings must be rendered within a text component
import "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "nanoid/async/index.native";
// import action
import { addCard as saveCard } from "../actions/decks";



// Component loaded in deck view, aka when the user select or create e deck
export default function AddCards({ route, navigation }) {
  // Random id

  const [id, saveID] = useState("");

  useEffect(() => {
    const id = nanoid().then((id) => {
      saveID(id);
    });
  }, []);

  const dispatch = useDispatch();

  console.log("route");
  console.log(route);
  // I'm passing the deck id and name via route param
  const deckID = route.params.id;
  console.log("deck");
  console.log(deckID);

  const [cardQuestion, saveCardQuestion] = useState("");
  const [cardAnswer, saveCardAnswer] = useState("");

  function handleAddCard() {
    const card = {};
    card.deckId = deckID;
    card.id = id;
    card.question = cardQuestion;
    card.answer = cardAnswer;
    // dispatch action
    dispatch(saveCard(card));
    // return to deck view
    navigation.push('Deck',  {id: deckID} )
  }
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
      <Text>Write question and answer to add</Text>

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
  );
}

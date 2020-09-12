import React from "react";
import { Text, View, Button, BackHandler } from "react-native";
import { useSelector, useDispatch } from "react-redux";
// customize back button, we don't want to get the user back to the deck creation screen
import { useFocusEffect } from '@react-navigation/native';

//import action
import {deleteDeck} from "../actions/decks"

// Component loaded in deck view, aka when the user select or create e deck
export default function Deck({ route, navigation }) {
const dispatch = useDispatch();
 // If the user hit the Android hardware button, from the deck view, should go to the decks list tab and not to the previous screen 
 // It might be the deck creation screen and it would be a kind of bad user experience
 // I'm handling the software button in the header via navigator props in App.js
  useFocusEffect(
    React.useCallback(() => {
      const goBack = () => {
       
        navigation.popToTop();
        
      };

      BackHandler.addEventListener('hardwareBackPress', goBack);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', goBack);
    }, [])
  );


  console.log('route');
  console.log(route);
  // I'm passing the deck id and name via route param
  const  deckID  = route.params.id;
  console.log('deck', deckID);

  const storedDeck = useSelector((state) => state.decks[deckID]);

  console.log('storedDeck', storedDeck);

  function handleAddCards() {
    navigation.push('New Question',  { id: deckID} )
  }
  function handleTakeQuiz() {
    navigation.push('Take quiz',  { id: deckID} )
  }
  function handleDelete() {
    console.log('deleting ', deckID)
    dispatch(deleteDeck(deckID))
    navigation.navigate("Decks");
  }
  if (!storedDeck) {
    return null
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
      <Text>{storedDeck.name}</Text>

   
          <Text>Number of cards:</Text>
          <Text>{Object.keys(storedDeck.cards).length}</Text>
          <Button onPress={() => handleTakeQuiz()} title="Take the quiz"></Button>
    



<Button onPress={() => handleAddCards()} title="Add cards"></Button>
<Button onPress={() => handleDelete()} title="Delete"></Button>
    </View>
  );
}

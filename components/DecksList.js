import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Text,
  View,
  TextInput,
  Button,
  SafeAreaView,
  FlatList,
  TouchableHighlight,
} from "react-native";
// React navigation community solution inports
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
// Icons
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// Actions
import { newDeck } from "../actions/decks";

export default function DecksList({ navigation }) {
  const decks = useSelector((state) => state.decks);
  const deckList = Object.keys(decks).map((deckID) => {
   return decks[deckID];
  });
console.log(deckList);
  function handleDeckPress(deckID) {
    console.log(deckID, "pressed");
    navigation.push('Deck',  { id: deckID })
  }
  return (
 
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <FlatList
          data={deckList}
          renderItem={({ item, i, separators }) => (
            <TouchableHighlight
              key={item.id}
              onPress={() => handleDeckPress(item.id)}
            >
              <View style={{ backgroundColor: "white" }}>
                <Text>{item.name}</Text>
            
                <Text>{Object.keys(item.cards).length} cards</Text>
              </View>
            </TouchableHighlight>
          )}
    
        />
      </View>

  );
}

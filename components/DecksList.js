import React from "react";
import { useSelector } from "react-redux";
import { Text, View, FlatList, TouchableHighlight } from "react-native";
// React navigation community solution inports
import "react-native-gesture-handler";

/**
 * DeckList component
 *
 * @description The DeckList component renders a list of decks. It uses FlatList to improve performance.
 * @export Component
 * @param {Object} { navigation } Navigation prop from react-navigation
 * @returns Children components
 */
export default function DecksList({ navigation }) {
  const decks = useSelector((state) => state.decks);
  const deckList = Object.keys(decks).map((deckID) => {
    return decks[deckID];
  });

  // When the user tap on a deck, navigate to the Deck view and pass the deck id as route parameter
  function handleDeckPress(deckID) {
    navigation.push("Deck", { id: deckID });
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

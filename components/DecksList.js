import React from "react";
import { useSelector } from "react-redux";
import { Text, View, FlatList, TouchableHighlight } from "react-native";

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
    <View
      style={{
        width: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlatList
        data={deckList}
        renderItem={({ item, i, separators }) => (
          <TouchableHighlight
            style={{ margin: 20 }}
            key={item.id}
            onPress={() => handleDeckPress(item.id)}
          >
            <View
              style={{
                backgroundColor: "white",
                width: "100%",
                padding: 30,
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 32, padding: 10 }}>{item.name}</Text>
              <Text>{Object.keys(item.cards).length} cards</Text>
            </View>
          </TouchableHighlight>
        )}
      />
    </View>
  );
}

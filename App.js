import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TabBarIOS } from "react-native";
// React navigation community solution inports
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

// TODO: Remove
import { MaterialCommunityIcons } from "@expo/vector-icons";
// Redux  inports
import { createStore } from "redux";
import { Provider } from "react-redux";
// Inport root reducer
import reducer from "./reducers";
// Inport middleware
import middleware from "./middleware";

// Import stack navigator

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

// import components
import AddDeck from "./components/AddDeck";
import DecksList from "./components/DecksList";
import Deck from "./components/Deck";
import Homepage from "./components/Homepage";
import AddCards from "./components/AddCards";
import Quiz from "./components/Quiz";

// Edit header back button (software) hardware is listened for in component
import { HeaderBackButton } from "@react-navigation/stack";

const store = createStore(reducer, middleware);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Homepage" component={Homepage} />
          <Stack.Screen
            name="Deck"
            component={Deck}
            options={({ navigation }) => ({
              headerLeft: (props) => (
                <HeaderBackButton
                  {...props}
                  onPress={(e) => {
                    navigation.navigate("Decks");
                  }}
                />
              ),
            })}
          />
          <Stack.Screen name="New Question" component={AddCards} />
          <Stack.Screen name="Take quiz" component={Quiz} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

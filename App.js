// React Navigation, see why it's at the top: https://reactnavigation.org/docs/getting-started/
import "react-native-gesture-handler";
import React from "react";
// React navigation community solution inports
import { NavigationContainer } from "@react-navigation/native";
// Redux  inports
import { createStore } from "redux";
import { Provider } from "react-redux";
// Inport root reducer
import reducer from "./reducers";
// Inport middleware
import middleware from "./middleware";
// Import stack navigator
import { createStackNavigator } from "@react-navigation/stack";
// import components
import Deck from "./components/Deck";
import Homepage from "./components/Homepage";
import AddCards from "./components/AddCards";
import Quiz from "./components/Quiz";
// Edit header back button (software) hardware is listened for in component
import { HeaderBackButton } from "@react-navigation/stack";
// Redux persist
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/es/integration/react";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
// Inport not deprecated async storage
import AsyncStorage from "@react-native-community/async-storage";

// Store imported stack navigator in a constant
const Stack = createStackNavigator();

// Persist store config, hardset initial store from async storage discarding default store values
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};

// Create a persistant reducer to pass to the store
const persistedReducer = persistReducer(persistConfig, reducer);

// Create the store passing it the persisted reducer and middleware
const store = createStore(persistedReducer, middleware);
// Define the persistor to pass to Persistgate to wait rehydration before rendering the app
const persistor = persistStore(store);

/**
 * App component
 *
 * @description The App component is the main component, it handles routing and redux store creation and persistance.
 * @export Component
 * @returns Children components
 */
export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
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
      </PersistGate>
    </Provider>
  );
}

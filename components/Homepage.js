import React, { useEffect } from "react";
import { useSelector } from "react-redux";
// Tab navigator
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// Icons for tab nav
import { Entypo } from "@expo/vector-icons";
// Import components
import AddDeck from "./AddDeck";
import DecksList from "./DecksList";
// Import notifications utility function
import { setupNotifications } from "../utils/notifications";

// Copy the Tab component to a const
const Tab = createMaterialBottomTabNavigator();

/**
 * Homepage component
 *
 * @description In the homepage component, that is nested in the stack navigator, the tab navigator loads the 2 tab components. Notifications are set here.
 * @export Component
 * @returns Children components
 */
export default function Homepage() {
  // Get date of last quiz
  const lastQuizTime = useSelector((state) => state.quizTime);
  // Schedule notifications and update them when the user takes the quiz
  useEffect(() => {
  setupNotifications(lastQuizTime.time);
  console.log('HOMETIME', lastQuizTime.time)
  }, [lastQuizTime.time]);

  return (
    <Tab.Navigator initialRouteName="Decks">
      <Tab.Screen
        name="Decks"
        component={DecksList}
        options={{
          tabBarLabel: "Decks",
          tabBarIcon: () => <Entypo name="list" color="white" size={23} />,
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Add"
        component={AddDeck}
        options={{
          tabBarLabel: "Add deck",
          tabBarIcon: () => (
            <Entypo name="add-to-list" color="white" size={23} />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
}

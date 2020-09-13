import React, {useEffect} from "react";
import { Text, View } from "react-native";
// Tab navigator
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// Icons for tab nav
import { Entypo } from "@expo/vector-icons";
// import components
import AddDeck from "./AddDeck";
import DecksList from "./DecksList";
import { useSelector } from 'react-redux'
import { setupNotifications } from '../utils/notifications'

// Copy the Tab component to a const
const Tab = createMaterialBottomTabNavigator();

// In the homepage component the tab navigator loads the 2 tab components, in witch are nested the rest of the navigation as stack
export default function Homepage() {


        // Schedule notification after a day when the user view a card in the quiz view
        const lastQuizTime = useSelector((state) => state.quizTime);
        useEffect(() => {
         setupNotifications(lastQuizTime)    
        }, [lastQuizTime]);

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

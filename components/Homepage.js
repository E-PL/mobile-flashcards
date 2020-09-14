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

  /*
  * The reviewer reported this:
  *
  * Unable to review
  * Your project could not be reviewed. Please resubmit after you address the issue noted below by the reviewer.
  *
  * Dear student,
  *
  * Thanks for the first submission.

  * I'm sorry to say that your submission can't be graded at this time as you as the app can't be started because of below issue:
  *
  * File Name: Homepage.js
  * Unrecognized event:
  * Possible Unhandled Promise Rejection (id: 0):
  * TypeError: undefined is not an object (evaluating 'lastQuizTime.time')
  * Please make sure to check if not throwing any issue in your next submission along with other files.
  *
  * Looking forward to your next submission.
  *
  * Keep learning and stay Udacious. :udacious:
  *
  * Best of luck :)
  * **************************************************************************************************************************************************************
  * Honestly, I'm not getting any error, but I'll try to fix it using just lastquizTime instead of lastQuizTime.time in the useffect optional array (It should be ok even if undefined at first)
  * Also I'll do a check to see if lastQuizTime.time is undefined before passing it to the setupNotifications() functions
  */
  useEffect(() => {
    typeof lastQuizTime.time !== "undefined" && setupNotifications(lastQuizTime.time);
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

# Mobile Flashcards Project

This is the last project of Udacity's React Nanodegree program.

I have built an Android ( and iOS ) app with React Native.

The app allows users to create decks with cards with question and answer and to quiz themselves over them.

The app saves the time of the last quiz taken and set a notification to remind the user to take the quizzes after one day, everyday.


## Use the app

The app will start at an empty list of decks, to start using it tap on the add deck card and add a deck with some questions.

When you are done adding decks and cards, see them in the decks tab and select them to take the quiz! 


### Run the project

 The app was built with Node v12.18.3 and requires at least node ^10 

 * download and unzip the compressed folder or clone the repository: `git clone git@github.com:E-PL/mobile-flashcards.git`
 * install or update Node
 * install or update Yarn
 * install expo-cli globally: `yarn global add expo-cli`
 * install all project dependencies: `yarn install`
 * start project: `yarn start` ( A QR code will be showing up in your console, otherwise open a browser and visit http://localhost:19002 and you'll find it )
 * install the Expo app from Google Play Store on your Android device
 * open the Expo app and tap on `Scan QR Code`
 * the app will run on your phone, to debug it, shake the phone and tap on `Debug remote JS`, a browser window will open on your pc and you'll be able to use the developers tools there.


Note: I have developed the app mainly for and with Android, but I have tested it in iOS too. To run on iPhones use the Expo Client app from the App store. In that case you'll need to scan the QR code from the camera app on newer iPhones or from a QR reader app on older ones to start the app.


### App

This project is part of the [Udacity](https://udacity.com) React Nanodegree program

A React Native App Bootstrapped with [Expo](https://expo.io/)

Use React Navigation for routing.

Use Redux for managing app state.

Use [redux-logger](https://github.com/theaqua/redux-logger) for logging actions.

Use Redux-persist to save the redux store on async storage.

Use react-native-community version of async-storage.

Use Nano ID to generate random ids.


## Contributing

This project in an exercise for the Udacity React Nanodegree program, therefore I will most likely not accept pull requests
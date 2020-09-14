// Set up notifications with expo-notifications
// See https://github.com/expo/expo/tree/master/packages/expo-notifications

// Inport the notification object by expo
import * as Notifications from "expo-notifications";

/**
 * setupNotifications function
 *
 * @description The setupNotifications functions runs from an useEffect hook in homepage component, it check and ask for permissions and schedule dayly notifications.
 * @export function
 * @param {Number} lastQuizTime The date created when a user visit the quiz view (last time the user took a quiz). This value is then saved to the persistant Redux store. I'm calling the function from the homepage component because from there I can get access to useSelector 
 */
export function setupNotifications(lastQuizTime) {
  // First of all clear all notifications
  clearNotifications()
    .then((res) => {
      // Then check if we have permissions
      checkPermission()
        .then((res) => {
          // If we have permissions, schedule notifications
          scheduleNotifications(lastQuizTime);
          // If we don't, reject the promise
          if (!res) return Promise.reject(res);
        })
        .catch((err) => {
          // If permissions are missing, request them to the user
          console.log("Missing permissions");
          askPermission()
            .then((res) => {
              // Then just try to schedule notifications
              scheduleNotifications(lastQuizTime);
            })
            .catch((err) => {
              // If the user didn't gave permissions, just print the error on the console
              console.log(err);
            });
        });
    })
    .catch((err) => {
      // Final catch them all 
      console.log("Error in clearing notifications or in promise chain:", err);
    });
}

// Return async Notifications method
async function clearNotifications() {
  return await Notifications.cancelAllScheduledNotificationsAsync();
}
// Return async Notifications method passing it a permission object for iOS (Android doesn't need one)
async function askPermission() {
  return await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
  });
}

// Check for permissions and return the result 
async function checkPermission() {
  const settings = await Notifications.getPermissionsAsync();
  return settings.granted;
}

// Return the async Notifications method with a configuration object
async function scheduleNotifications(fromTime) {
  // Get the time
  const now = Date.now();
  // Subtract from the present time the time when the user took the quiz, divide by 1000 and add the seconds in a day to get the same time the user took a quiz but tomorrow.
  const time = (now - fromTime) / 1000 + 86400;
  // Uncomment next line to test notifications
  // time = 60;
  return await Notifications.scheduleNotificationAsync({
    content: {
      title: "Take your daily quiz",
      body: "Open the app and do it now!",
    },
    trigger: {
      seconds: time,
      repeats: true,
    },
  });
}

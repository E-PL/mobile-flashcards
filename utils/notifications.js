// Set up notifications with expo-notifications
// See https://github.com/expo/expo/tree/master/packages/expo-notifications

import * as Notifications from "expo-notifications";

export function setupNotifications(lastQuizTime) {

  console.log("SETTING NOTIFICATIONS UP");

  clearNotifications()
    .then((res) => {
      checkPermission()
        .then((res) => {
          scheduleNotifications(lastQuizTime);
          if (!res) return Promise.reject(res);
        })
        .catch((err) => {
          console.log("Missing permissions");
          askPermission()
            .then((res) => {
              scheduleNotifications(lastQuizTime);
            })
            .catch((err) => {
              console.log(err);
            });
        });
    })
    .catch((err) => {
      console.error(
        "Error in clearing notifications or in promise chain:",
        err
      );
    });
}

async function clearNotifications() {
  return await Notifications.cancelAllScheduledNotificationsAsync();
}
async function askPermission() {
  return await Notifications.requestPermissionsAsync({});
}

async function checkPermission() {
  const settings = await Notifications.getPermissionsAsync();
  return settings.granted;
}

async function scheduleNotifications(fromTime) {
  const now = Date.now();
  const time = (now - fromTime) / 1000 + 86400;

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

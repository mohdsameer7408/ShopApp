import "react-native-gesture-handler";
import React, { useState } from "react";
import { LogBox } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { enableScreens } from "react-native-screens";
import * as Notifications from "expo-notifications";
import store from "./app/features/store";
import { Provider } from "react-redux";
import ShopNavigator from "./app/navigations/ShopNavigator";

enableScreens();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
  }),
});

const fetchFonts = () =>
  Font.loadAsync({
    "open-sans": require("./app/assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./app/assets/fonts/OpenSans-Bold.ttf"),
  });

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  LogBox.ignoreLogs(["Setting a timer"]);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(error) => console.log(error)}
      />
    );
  }

  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}

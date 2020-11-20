import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "../screens/user/AuthScreen";
import Colors from "../constants/Colors";
import { Platform } from "react-native";

const Stack = createStackNavigator();

const AuthStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="AuthScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor:
            Platform.OS === "android" ? Colors.primaryColor : "#fff",
        },
        headerTintColor:
          Platform.OS === "android" ? "#fff" : Colors.primaryColor,
        headerTitleStyle: { fontFamily: "open-sans-bold" },
        headerBackTitleStyle: { fontFamily: "open-sans" },
      }}
    >
      <Stack.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={{ headerTitle: "Register to Shop App" }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;

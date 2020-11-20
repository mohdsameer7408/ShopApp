import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { createStackNavigator } from "@react-navigation/stack";
import OrdersScreen from "../screens/shop/OrdersScreen";
import ShopHeaderButton from "../components/UI/ShopHeaderButton";
import Colors from "../constants/Colors";
import { Platform } from "react-native";

const Stack = createStackNavigator();

const OrdersStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="OrdersScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor:
            Platform.OS === "android" ? Colors.primaryColor : "#fff",
        },
        headerTintColor:
          Platform.OS === "android" ? "#fff" : Colors.primaryColor,
        headerTitleStyle: { fontFamily: "open-sans-bold" },
        headerBackTitleStyle: { fontFamily: "open-sans" },
        headerLeft: () => (
          <HeaderButtons HeaderButtonComponent={ShopHeaderButton}>
            <Item
              title="Menu"
              iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
              onPress={() => navigation.toggleDrawer()}
            />
          </HeaderButtons>
        ),
      }}
    >
      <Stack.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={{
          headerTitle: "Your Orders",
        }}
      />
    </Stack.Navigator>
  );
};

export default OrdersStack;

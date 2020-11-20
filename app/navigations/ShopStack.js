import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { createStackNavigator } from "@react-navigation/stack";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import ShopHeaderButton from "../components/UI/ShopHeaderButton";
import Colors from "../constants/Colors";
import { Platform } from "react-native";

const Stack = createStackNavigator();

const ShopStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="ProductsOverviewScreen"
      screenOptions={{
        headerStyle: {
          backgroundColor:
            Platform.OS === "android" ? Colors.primaryColor : "#fff",
        },
        headerTintColor:
          Platform.OS === "android" ? "#fff" : Colors.primaryColor,
        headerTitleStyle: { fontFamily: "open-sans-bold" },
        headerBackTitleStyle: { fontFamily: "open-sans" },
        headerRight: () => (
          <HeaderButtons HeaderButtonComponent={ShopHeaderButton}>
            <Item
              title="Cart"
              iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              onPress={() => navigation.navigate("CartScreen")}
            />
          </HeaderButtons>
        ),
      }}
    >
      <Stack.Screen
        name="ProductsOverviewScreen"
        component={ProductsOverviewScreen}
        options={{
          headerTitle: "Products",
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
      />
      <Stack.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={({ route }) => ({ headerTitle: route.params.title })}
      />
      <Stack.Screen
        name="CartScreen"
        component={CartScreen}
        options={{ headerTitle: "Your Cart" }}
      />
    </Stack.Navigator>
  );
};

export default ShopStack;

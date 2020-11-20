import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { createStackNavigator } from "@react-navigation/stack";
import EditProductScreen from "../screens/user/EditProductScreen";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import ShopHeaderButton from "../components/UI/ShopHeaderButton";
import { Platform } from "react-native";
import Colors from "../constants/Colors";

const Stack = createStackNavigator();

const UserStack = ({ navigation }) => {
  return (
    <Stack.Navigator
      initialRouteName="UserProductsScreen"
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
        name="UserProductsScreen"
        component={UserProductsScreen}
        options={{
          headerTitle: "Your Products",
          headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={ShopHeaderButton}>
              <Item
                title="Menu"
                iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                onPress={() => navigation.toggleDrawer()}
              />
            </HeaderButtons>
          ),
          headerRight: () => (
            <HeaderButtons HeaderButtonComponent={ShopHeaderButton}>
              <Item
                title="Create"
                iconName={
                  Platform.OS === "android" ? "md-create" : "ios-create"
                }
                onPress={() => navigation.navigate("EditProductScreen")}
              />
            </HeaderButtons>
          ),
        }}
      />
      <Stack.Screen
        name="EditProductScreen"
        component={EditProductScreen}
        options={({ route }) => ({
          headerTitle: route.params ? "Edit Product" : "Create a Product",
          // headerRight: () => (
          //   <HeaderButtons HeaderButtonComponent={ShopHeaderButton}>
          //     <Item
          //       title="Save"
          //       iconName={
          //         Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"
          //       }
          //       onPress={() => {}}
          //     />
          //   </HeaderButtons>
          // ),
        })}
      />
    </Stack.Navigator>
  );
};

export default UserStack;

import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ShopStack from "./ShopStack";
import UserStack from "./UserStack";
import DrawerContent from "./DrawerContent";
import OrdersStack from "./OrdersStack";
import AuthStack from "./AuthStack";
import { useSelector } from "react-redux";
import { selectUserToken } from "../features/authSlice";
import StartupScreen from "../screens/StartupScreen";

const Drawer = createDrawerNavigator();

const ShopNavigator = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const userToken = useSelector(selectUserToken);

  if (isLoading) {
    return <StartupScreen setIsLoading={setIsLoading} />;
  }

  return (
    <NavigationContainer>
      {!userToken ? (
        <AuthStack />
      ) : (
        <Drawer.Navigator
          initialRouteName="ShopStack"
          drawerContent={(props) => <DrawerContent {...props} />}
        >
          <Drawer.Screen name="ShopStack" component={ShopStack} />
          <Drawer.Screen name="OrdersStack" component={OrdersStack} />
          <Drawer.Screen name="UserStack" component={UserStack} />
        </Drawer.Navigator>
      )}
    </NavigationContainer>
  );
};

export default ShopNavigator;

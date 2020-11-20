import React, { useCallback, useEffect, useState } from "react";
import { FlatList, ActivityIndicator, View, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from "../../components/shop/OrderItem";
import Colors from "../../constants/Colors";
import { selectOrders, setOrdersAsync } from "../../features/ordersSlice";
import SecondaryScreen from "./SecondaryScreen";

const OrdersScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const orders = useSelector(selectOrders);
  const dispatch = useDispatch();

  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      await dispatch(setOrdersAsync());
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  }, [setIsLoading, dispatch]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  if (isLoading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  return orders.length ? (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <OrderItem orderItem={item} />}
    />
  ) : (
    <SecondaryScreen>No orders yet, Shop now!</SecondaryScreen>
  );
};

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrdersScreen;

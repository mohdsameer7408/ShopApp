import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../components/shop/CartItem";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import {
  emptyCart,
  removeFromCart,
  selectCartAmount,
  selectCartItems,
} from "../../features/cartSlice";
import { addAnOrderAsync } from "../../features/ordersSlice";
import SecondaryScreen from "./SecondaryScreen";

const CartScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const totalAmount = useSelector(selectCartAmount);
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const placeOrder = async () => {
    setIsLoading(true);
    await dispatch(addAnOrderAsync({ cartItems, totalAmount }));
    dispatch(emptyCart());
    setIsLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>
            ${Math.round(totalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.primaryColor} />
        ) : (
          <Button
            title="Order Now"
            color={Colors.accentColor}
            disabled={cartItems.length === 0}
            onPress={placeOrder}
          />
        )}
      </Card>
      {cartItems.length ? (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CartItem
              cartItem={item}
              deletable
              onRemove={() =>
                dispatch(
                  removeFromCart({
                    id: item.id,
                    qty: item.qty,
                    price: item.price,
                  })
                )
              }
            />
          )}
        />
      ) : (
        <SecondaryScreen>
          Your cart is empty, Add a product to order now!
        </SecondaryScreen>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Colors.primaryColor,
  },
});

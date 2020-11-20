import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import Colors from "../../constants/Colors";
import Card from "../UI/Card";
import CartItem from "./CartItem";

const OrderItem = ({ orderItem }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>
          ${orderItem.totalAmount.toFixed(2)}
        </Text>
        <Text style={styles.date}>{orderItem.date}</Text>
      </View>
      <Button
        title={showDetails ? "Hide Details" : "Show Details"}
        color={Colors.primaryColor}
        onPress={() => setShowDetails((prevState) => !prevState)}
      />
      {showDetails && (
        <View style={styles.detailItems}>
          {orderItem.cartItems.map((item) => (
            <CartItem key={item.id} cartItem={item} />
          ))}
        </View>
      )}
    </Card>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontFamily: "open-sans",
    fontSize: 16,
    color: "#888",
  },
  detailItems: {
    width: "100%",
  },
});

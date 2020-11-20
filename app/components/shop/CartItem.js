import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = ({ cartItem, onRemove, deletable }) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>x{cartItem.qty} </Text>
        <Text style={styles.mainText}>
          {cartItem.title.length > 20
            ? cartItem.title.slice(0, 15) + "..."
            : cartItem.title}
        </Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>${cartItem.sum.toFixed(2)}</Text>
        {deletable && (
          <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
            <Ionicons
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              size={23}
              color="red"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    fontFamily: "open-sans",
    color: "#888",
    fontSize: 16,
  },
  mainText: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  deleteButton: {
    marginLeft: 20,
  },
});

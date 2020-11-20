import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  Button,
  ActivityIndicator,
  View,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/Colors";
import { addToCart } from "../../features/cartSlice";
import {
  selectAvailableProducts,
  setProductsAsync,
} from "../../features/productsSlice";
import SecondaryScreen from "./SecondaryScreen";

const ProductsOverviewScreen = ({ navigation }) => {
  const [loading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const products = useSelector(selectAvailableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setIsRefreshing(true);
    setError(null);
    try {
      await dispatch(setProductsAsync());
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => setIsLoading(false));
  }, [dispatch, loadProducts]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadProducts);

    return () => {
      unsubscribe();
    };
  }, [loadProducts]);

  const selectHandler = (item) => {
    navigation.navigate("ProductDetailScreen", item);
  };

  if (loading) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator size="large" color={Colors.primaryColor} />
      </View>
    );
  }

  if (!loading && error) {
    return (
      <View style={styles.loadingScreen}>
        <Text>{error}</Text>
        <Button
          title="Try Again"
          color={Colors.primaryColor}
          onPress={loadProducts}
        />
      </View>
    );
  }

  return !loading && products.length ? (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      renderItem={({ item }) => (
        <ProductItem
          navigation={navigation}
          product={item}
          onSelect={() => selectHandler(item)}
        >
          <Button
            title="View Details"
            onPress={() => selectHandler(item)}
            color={Colors.primaryColor}
          />
          <Button
            title="To Cart"
            onPress={() => dispatch(addToCart(item))}
            color={Colors.primaryColor}
          />
        </ProductItem>
      )}
    />
  ) : (
    <SecondaryScreen>
      No products found, May be start adding some!
    </SecondaryScreen>
  );
};

export default ProductsOverviewScreen;

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

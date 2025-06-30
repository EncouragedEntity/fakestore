import React from "react";
import { FlatList, Text, View } from "react-native";
import { useDispatch, useSelector } from "app/storage/utilities";
import { ProductStack, routes } from "app/navigation";
import ProductsModule from "app/modules/products";
import styles from './styles';
import Tile from "app/components/Tile";
import Button from "app/components/Button";

type Props = ProductStack<typeof routes.products.list>;

export default React.memo<Props>(({ navigation }) => {
  const dispatch = useDispatch();

  const products = useSelector(ProductsModule.getProducts);

  React.useEffect(() => {
    if(!products?.length) dispatch(ProductsModule.fetch());
  });

  const handleAddProduct = React.useCallback(() => {
    navigation.navigate(routes.products.entity);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Tile.Product
            image={item?.image || ''}
            title={item?.title || ''}
            price={item?.price || 0}
            onPress={() => {
              console.log('Product pressed:', item.id);
            }}
          />
        )}
        ListEmptyComponent={() => {
          return (
            <View style={styles.empty}>
              <Text>Список товарів порожній</Text>
            </View>
          );
        }}
        ListFooterComponent={() => <View style={styles.footer} />}
      />

      <Button.Filled
        title='Додати товар'
        onPress={handleAddProduct}
        style={styles.button}
      />
    </View>
  );
});
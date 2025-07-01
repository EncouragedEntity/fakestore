import React from "react";
import { View, Text, ScrollView } from "react-native";
import styles from './styles';
import { ProductStack, routes } from "app/navigation";
import { useSelector } from "app/storage/utilities";
import ProductsModule from "app/modules/products";
import FastImage from "react-native-fast-image";

type Props = ProductStack<typeof routes.products.details>;


export default React.memo<Props>(({ route }) => {
    const { id } = route.params;

    const product = useSelector(ProductsModule.getDetails(id));

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <FastImage
          source={{ uri: product?.image }}
          style={styles.image}
          resizeMode={FastImage.resizeMode.contain}
        />

        <View style={styles.infoContainer}>
          <Text style={styles.category}>{product?.category?.toUpperCase()}</Text>
          <Text style={styles.title}>{product?.title}</Text>
          <Text style={styles.price}>${product?.price?.toFixed(2)}</Text>
          <Text style={styles.description}>{product?.description}</Text>
        </View>
      </ScrollView>
    );
  }
);

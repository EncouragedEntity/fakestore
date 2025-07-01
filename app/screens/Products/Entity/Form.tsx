import React from "react";
import { View } from "react-native";
import * as Yup from "yup";
import ProductsModule, { Product } from "app/modules/products";
import Toast from "react-native-toast-message";
import { useFormik } from "formik";
import { ProductStack, useNavigation } from "app/navigation";
import { useDispatch } from "app/storage/utilities";
import styles from "./styles";
import Input from "app/components/Input";
import Button from "app/components/Button";
const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  price: Yup.number().required("Price is required").positive("Price must be positive"),
  description: Yup.string().required("Description is required"),
});

type Props = { product: Partial<Product> }

export default React.memo<Props>(({ product }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation<ProductStack['navigation']>();
  
  const form = useFormik({
    initialValues: {
      title: product.title || "",
      price: String(product.price || ""),
      description: product.description || "",
      image: 'https://picsum.photos/300/200'
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(ProductsModule.create.async({ product: {
        ...values,
        price: parseFloat(values?.price),
      }})).catch((error) => {
        Toast.show({
          text1: "Error",
          text2: error.message || "An error occurred while creating the product.",
        });
      }).finally(() => {
        navigation.goBack();
      });
    },
  });

  return (
    <React.Fragment>
      <Input.Text
          label="Назва"
          onChangeText={form.handleChange("title")}
          onBlur={form.handleBlur("title")}
          error={form.touched.title ? form.errors.title : undefined}
          value={form.values.title}
        />

        <Input.Text
          label="Опис"
          onChangeText={form.handleChange("description")}
          onBlur={form.handleBlur("description")}
          error={form.touched.description ? form.errors.description : undefined}
          value={form.values.description}
          multiline={true}
        />

        <Input.Text
          label="Ціна"
          onChangeText={form.handleChange("price")}
          onBlur={form.handleBlur("price")}
          error={form.touched.price ? form.errors.price : undefined}
          value={form.values.price}
          keyboardType="numeric"
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <View style={{ flex: 1 }} />

        <Button.Filled
          title="Додати товар"
          onPress={form.handleSubmit as any}
          disabled={(!form.isValid && form.submitCount > 0) || form.isSubmitting}
          style={styles.submit}
        />
    </React.Fragment>
  );

});
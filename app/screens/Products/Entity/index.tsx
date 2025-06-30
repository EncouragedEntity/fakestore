import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Platform,
} from "react-native";
import styles from "./styles";
import { ProductStack, routes } from "app/navigation";
import Input from "app/components/Input";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "app/components/Button";
import { useDispatch } from "app/storage/utilities";
import ProductsModule from "app/modules/products";
import Toast from "react-native-toast-message";

type Props = ProductStack<typeof routes.products.entity>;

const schema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  price: Yup.number().required("Price is required").positive("Price must be positive"),
  description: Yup.string().required("Description is required"),
});

export default React.memo<Props>(({ navigation, route }) => {
  const dispatch = useDispatch();

  const form = useFormik({
    initialValues: {
      title: route.params?.product.title || "",
      price: String(route.params?.product.price || ""),
      description: route.params?.product.description || "",
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <Input.Text
          label="Title"
          onChangeText={form.handleChange("title")}
          onBlur={form.handleBlur("title")}
          error={form.errors.title}
          value={form.values.title}
        />

        <Input.Text
          label="Description"
          onChangeText={form.handleChange("description")}
          onBlur={form.handleBlur("description")}
          error={form.errors.description}
          value={form.values.description}
          multiline={true}
        />

        <Input.Text
          label="Price"
          onChangeText={form.handleChange("price")}
          onBlur={form.handleBlur("price")}
          error={form.errors.price}
          value={form.values.price}
          keyboardType="numeric"
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <View style={{ flex: 1 }} />

        <Button.Filled
          title="Створити"
          onPress={form.handleSubmit as any}
          disabled={!form.isValid || form.isSubmitting}
          style={styles.submit}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
});

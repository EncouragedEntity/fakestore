import React from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import styles from "./styles";
import { ProductStack, routes } from "app/navigation";
import Form from './Form';

type Props = ProductStack<typeof routes.products.entity>;

export default React.memo<Props>(({navigation, route}) => {
  const product = route.params?.product || {}; 

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
        <Form product={product} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
});

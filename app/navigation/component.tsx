import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import routes from './routes';
import { NavigationRef, RootStack, ProductStack } from './types';
import type { ProductStackParams, RootStackParams } from './types';
import Products from 'app/screens/Products';

const ProductsNavigation: React.FC<RootStack<typeof routes.products.stack>> = React.memo(() => {
  const Stack = React.useMemo(() => createStackNavigator<ProductStackParams>(), []);

  return (
    <Stack.Navigator
      id={routes.products.stack}
      initialRouteName={routes.products.list}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={routes.products.list}
        component={Products.List}
        options={{
          headerShown: true,
          headerTitle: 'Список товарів',
          headerTitleAlign: 'center',
        }}
      />

       <Stack.Screen
        name={routes.products.details}
        component={Products.Details}
        options={{
          headerShown: true,
          headerTitle: 'Деталі товару',
          headerTitleAlign: 'center',
        }}
      />

       <Stack.Screen
        name={routes.products.entity}
        component={Products.Entity}
        options={{
          headerShown: true,
          headerTitle: 'Створення товару',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
});

export default React.forwardRef<NavigationRef, {}>((props, ref) => {
  const navigation = React.useRef<NavigationRef>(null);

  const Stack = React.useMemo(() => createStackNavigator<RootStackParams>(), []);

  React.useImperativeHandle<NavigationRef | null, NavigationRef | null>(ref, () => navigation.current);

  return (
    <NavigationContainer ref={navigation} {...props}>
      <Stack.Navigator
        id={routes.root.stack}
        initialRouteName={routes.products.stack}
        screenOptions={{ headerShown: false }}
      >

      <Stack.Screen
        component={ProductsNavigation}
        name={routes.products.stack}
      />

      </Stack.Navigator>
    </NavigationContainer>
  );
});
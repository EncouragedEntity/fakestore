import type {
  CompositeScreenProps,
  NavigationContainerRef,
  NavigatorScreenParams,
} from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import routes from './routes';
import type { Product } from 'app/modules/products';

export type ProductStackParams = {
  [routes.products.list]: undefined;
  [routes.products.details]: { id: number };
  [routes.products.entity]?: { product: Partial<Product> };
};

export type RootStackParams = {
  [routes.products.stack]: NavigatorScreenParams<ProductStackParams>;
};

export type ProductStack<T extends keyof ProductStackParams> = CompositeScreenProps<
  StackScreenProps<ProductStackParams, T>,
  StackScreenProps<RootStackParams>
>;

export type RootStack<T extends keyof RootStackParams> = StackScreenProps<RootStackParams, T>;

export type NavigationRef = NavigationContainerRef<RootStackParams>;

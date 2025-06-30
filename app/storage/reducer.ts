/* eslint-disable import/order */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistCombineReducers } from './persist';
import { reducer as products } from 'app/modules/products';

const reducers = {
  products,
} as const;

export default persistCombineReducers({
  key: require('../../package.json').name,
  blacklist: Object.keys(reducers),
  storage: AsyncStorage,
}, reducers);

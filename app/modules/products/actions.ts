import { createAction, createProcessAction } from 'app/storage/utilities';
import { actions as global } from 'app/storage/utilities';
import type { Product, State } from './types';

export { global };

export const request = {
  fetch: createAction('[PRODUCTS][DATA][REQUEST]'),
  details: createAction<{ id: Product['id']; }>('[PRODUCTS][DETAILS][REQUEST]'),
  create: createAction<{product: Partial<Product>}>('[PRODUCTS][CREATE][REQUEST]'),
} as const;

export const reduce = {
  events: createProcessAction('[PRODUCTS][EVENTS][REDUCE]'),
  data: createAction<Pick<State, 'data'>>('[PRODUCTS][DATA][REDUCE]'),
} as const;

export default request;
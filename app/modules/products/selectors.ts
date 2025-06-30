import type { Storage } from 'app/storage';
import * as actions from './actions';

type Key = Parameters<typeof actions.reduce.events.get>[1];

export default {
  getEvent: (key: Key) => (state: Storage) => actions.reduce.events.get(state.products.events, key),
  getProducts: (storage: Storage) => storage.products.data,
  getDetails: (id: number | undefined) => (storage: Storage) => storage.products.data.find(item => item.id === id),
};
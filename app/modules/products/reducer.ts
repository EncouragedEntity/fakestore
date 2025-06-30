import { createReducer } from 'app/storage/utilities';
import * as actions from './actions';
import type { Product, State } from './types';

const initial = Object.seal<State>({
  events: {},
  data: [],
});

export default createReducer(initial, builder => {
  builder.addCase(actions.global.store.reset, () => initial);

  builder.addCase(actions.reduce.events, (state, { payload }) => ({
    ...state,
    events: { ...state.events, ...payload },
  }));


  builder.addCase(actions.reduce.data, (state, { payload }) => {
    return ({
      ...state,
      data: payload.data,
    });
});

});
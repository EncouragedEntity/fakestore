import type { Saga, SagaMiddleware, Task } from 'redux-saga';

export const runSaga = (() => {
  let runner: Task<any> | undefined;

  return <C extends object = {}>(middleware: SagaMiddleware<C>, saga: Saga) => {
    if (__DEV__ && module.hot) {runner?.cancel();}

    runner = middleware.run(saga);
  };
})();

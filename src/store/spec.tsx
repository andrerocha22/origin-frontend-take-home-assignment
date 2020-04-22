import { RootDispatcher } from './root-reducer';

import configureStore from 'redux-mock-store';
const mockStore = configureStore();
const store = mockStore();

export enum ActionType {
  UpdateYear,
  UpdateMonth,
  UpdateAmount,
  UpdateDeposit
}

describe('input_actions', () => {
  const rootDispatcher = new RootDispatcher(store.dispatch);

  beforeEach(() => {
    store.clearActions();
  });
  test('Dispatches the correct action and payload for year', () => {
    const expectedActions = [
      {
        payload: { year: 1999 },
        type: ActionType.UpdateYear
      }
    ];

    rootDispatcher.updateYear(1999);
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('Dispatches the correct action and payload for month', () => {
    const expectedActions = [
      {
        payload: { month: 'January' },
        type: ActionType.UpdateMonth
      }
    ];

    rootDispatcher.updateMonth('January');
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('Dispatches the correct action and payload for amount', () => {
    const expectedActions = [
      {
        payload: { amount: 459.99 },
        type: ActionType.UpdateAmount
      }
    ];

    rootDispatcher.updateAmount(459.99);
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('Dispatches the correct action and payload for deposit', () => {
    const expectedActions = [
      {
        payload: { deposit: 12 },
        type: ActionType.UpdateDeposit
      }
    ];

    rootDispatcher.updateDeposit(12);
    expect(store.getActions()).toEqual(expectedActions);
  });
});

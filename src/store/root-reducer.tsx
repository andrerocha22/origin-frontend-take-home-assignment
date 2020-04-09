import { Action, Reducer, Dispatch } from 'redux';

export interface InitialState {
  year: number;
  month: string;
  amount: number;
  deposit: number;
}

export const initialState: InitialState = {
  year: 1999,
  month: 'January',
  amount: 0.0,
  deposit: 1
};

export interface DispatchAction extends Action {
  payload: Partial<InitialState>;
}

export enum ActionType {
  UpdateYear,
  UpdateMonth,
  UpdateAmount,
  UpdateDeposit
}

export const rootReducer: Reducer<InitialState, DispatchAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ActionType.UpdateYear:
      return { ...state, year: action.payload.year || 0 };
    case ActionType.UpdateMonth:
      return { ...state, month: action.payload.month || '' };
    case ActionType.UpdateAmount:
      return { ...state, amount: action.payload.amount || 0 };
    case ActionType.UpdateDeposit:
      return { ...state, deposit: action.payload.deposit || 0 };

    default:
      return state;
  }
};

export class RootDispatcher {
  dispatch: Dispatch<DispatchAction>;

  constructor(dispatch: Dispatch<DispatchAction>) {
    this.dispatch = dispatch;
  }

  updateYear = (year: number) =>
    this.dispatch({ type: ActionType.UpdateYear, payload: { year } });

  updateMonth = (month: string) =>
    this.dispatch({ type: ActionType.UpdateMonth, payload: { month } });

  updateAmount = (amount: number) =>
    this.dispatch({ type: ActionType.UpdateAmount, payload: { amount } });

  updateDeposit = (deposit: number) =>
    this.dispatch({ type: ActionType.UpdateDeposit, payload: { deposit } });
}

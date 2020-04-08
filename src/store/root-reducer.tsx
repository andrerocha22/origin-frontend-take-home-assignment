import { Action, Reducer, Dispatch } from 'redux';

export interface InitialState {
  year: number;
  month: string;
  amount: number;
}

export const initialState: InitialState = {
  year: 1999,
  month: 'January',
  amount: null
};

export interface DispatchAction extends Action {
  payload: Partial<InitialState>;
}

export enum ActionType {
  UpdateYear,
  UpdateMonth,
  UpdateAmount
}

export const rootReducer: Reducer<InitialState, DispatchAction> = (
  state = initialState,
  action
) => {
  //Trocar para switch
  if (action.type === ActionType.UpdateYear) {
    return { ...state, year: action.payload.year || 0 };
  } else if (action.type === ActionType.UpdateMonth) {
    return { ...state, month: action.payload.month || '' };
  } else if (action.type === ActionType.UpdateAmount) {
    return { ...state, amount: action.payload.amount || 0 };
  } else return state;
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
}

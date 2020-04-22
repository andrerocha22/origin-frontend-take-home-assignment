import * as React from 'react';
import './styles.scss';
import CurrencyInput from 'react-currency-input';

import { useDispatch, useSelector } from 'react-redux';
import { InitialState, RootDispatcher } from '../../store/root-reducer';

interface StateProps {
  amount: number;
}

const ValueInput: React.FC = props => {
  const { amount } = useSelector<InitialState, StateProps>(
    (state: InitialState) => {
      return {
        amount: state.amount
      };
    }
  );

  const dispatch = useDispatch();
  const rootDispatcher = new RootDispatcher(dispatch);

  const handleChange = (value: number) => {
    rootDispatcher.updateAmount(value);
  };

  return (
    <div className="value">
      <label>Total amount</label>
      <span className="valueInput">
        <span className="currencyIcon">$</span>
        <CurrencyInput
          className="inputAmount"
          onChangeEvent={e => {
            handleChange(e.target.value);
          }}
          maxLength="12"
          value={amount}
          decimalSeparator="."
          thousandSeparator=","
          selectAllOnFocus
          autoFocus
        />
      </span>
    </div>
  );
};

export default ValueInput;

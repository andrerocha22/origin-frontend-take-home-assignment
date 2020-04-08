import * as React from 'react';
import './styles.scss';
import ValueInput from '../../components/ValueInput';
import DateInput from '../../components/DateInput';

import { useDispatch, useSelector } from 'react-redux';
import { InitialState, RootDispatcher } from '../../store/root-reducer';

interface StateProps {
  year: number;
  month: string;
  amount: number;
  deposit: number;
}

const SavingGoal: React.FC = () => {
  const { year, month, amount, deposit } = useSelector<
    InitialState,
    StateProps
  >((state: InitialState) => {
    return {
      year: state.year,
      month: state.month,
      amount: state.amount,
      deposit: state.deposit
    };
  });

  const depositValue = () => {
    let valueToString = amount.toString(10).replace(/,/g, '');
    let depositValue = Number(valueToString) / deposit;
    return depositValue.toFixed(2);
  };

  return (
    <section className="savingGoalSimulator">
      <h3>
        Let's plan your <strong>saving goal.</strong>
      </h3>
      <div className="goalCalculator">
        <div className="calculatorHeader">
          <img src={require('~/assets/icons/house.svg')} alt="house-icon" />
          <h2>Buy a house</h2>
          <h4>Saving goal</h4>
        </div>
        <div className="calculatorInputs">
          <ValueInput />
          <DateInput />
        </div>

        <div className="summary">
          <h3>Monthly amount</h3>
          <h2>${depositValue()}</h2>
          <p>
            You are plaining <strong>{deposit} monthly deposits</strong> to
            reach your <strong>${amount} </strong>goal by{' '}
            <strong>
              {month} {year}
            </strong>
            .
          </p>
        </div>
      </div>
    </section>
  );
};

export default SavingGoal;

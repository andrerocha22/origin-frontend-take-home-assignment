import * as React from 'react';
import './styles.scss';
import ValueInput from '../../components/ValueInput';
import DateInput from '../../components/DateInput';

import { useSelector } from 'react-redux';
import { InitialState } from '../../store/root-reducer';

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
    const valueToString = amount.toString(10).replace(/,/g, '');
    const depositValue = Number(valueToString) / deposit;
    return depositValue.toFixed(2);
  };

  return (
    <section className="savingGoalSimulator">
      <h3>
        Let&apos;s plan your <strong>saving goal.</strong>
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
          <span className="depositSummary">
            <h3>
              Monthly <span className="amountText">amount</span>
            </h3>
            <h2 className="depositValue">${depositValue()}</h2>
          </span>
          <span className="descriptionSummary">
            <p>
              You are plaining{' '}
              <strong>
                {deposit} monthly {deposit > 1 ? 'deposits' : 'deposit'}
              </strong>{' '}
              to reach your <strong>${amount} </strong>goal by{' '}
              <strong>
                {month} {year}
              </strong>
              .
            </p>
          </span>
        </div>
        <div className="confirmButtonContainer">
          <button className='confirmButton' disabled={amount === 0 ? true : false}>Confirm</button>
        </div>
      </div>
    </section>
  );
};

export default SavingGoal;

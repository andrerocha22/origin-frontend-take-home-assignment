import * as React from 'react';
import './styles.scss';
import ValueInput from '../../components/ValueInput';
import DateInput from '../../components/DateInput';

const SavingGoal: React.FC = () => {
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
          <h2>520</h2>
          <p>
            You are plaining <strong>48 monthly deposits</strong> to reach your{' '}
            <strong>$25000 </strong>goal by
            <strong>October 2020</strong>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SavingGoal;

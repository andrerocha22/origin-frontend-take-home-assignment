import * as React from 'react';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { InitialState, RootDispatcher } from '../../store/root-reducer';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

interface StateProps {
  year: number;
  month: string;
}

const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });
const currentYear = new Date().getFullYear();

const DateInput: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = React.useState<string>(
    currentMonth
  );
  const [selectedYear, setSelectedYear] = React.useState<number>(currentYear);

  const { year, month } = useSelector<InitialState, StateProps>(
    (state: InitialState) => {
      return {
        year: state.year,
        month: state.month
      };
    }
  );

  const dispatch = useDispatch();
  const rootDispatcher = new RootDispatcher(dispatch);

  const handleFoward = () => {
    console.log('Forw - ' + year + ' ' + month);
  };

  const handleBackward = () => {
    rootDispatcher.updateYear(2020)
    console.log('Back');
  };

  return (
    <div>
      <label>Reach goal by</label>
      <div className="dateInput">
        <button
          className="back"
          onClick={() => handleBackward()}
          // disabled={
          //   selectedYear === currentYear && selectedMonth === currentMonth
          //     ? true
          //     : false
          // }
        >
          <img src={require('~/assets/icons/arrow.svg')} alt="arrow-left" />
        </button>
        <button className="pickButton">
          <h1>{month}</h1>
          <h2>{year}</h2>
        </button>
        <button className="forward" onClick={() => handleFoward()}>
          <img src={require('~/assets/icons/arrow.svg')} alt="arrow-right" />
        </button>
      </div>
    </div>
  );
};

export default DateInput;

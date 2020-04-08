import * as React from 'react';
import './styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { InitialState, RootDispatcher } from '../../store/root-reducer';
import moment from 'moment';

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
  const [selectedMonth, setSelectedMonth] = React.useState<number>(
    months.indexOf(currentMonth) + 1
  );
  const [minMonth, setMinMonth] = React.useState<string>('');

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

  React.useEffect(() => {
    rootDispatcher.updateMonth(months[selectedMonth]);
    rootDispatcher.updateYear(currentYear);
    setMinMonth(months[months.indexOf(currentMonth) + 1]);
  }, []);

  const handleFoward = () => {
    if (selectedMonth === months.indexOf('December')) {
      rootDispatcher.updateYear(year + 1);
      rootDispatcher.updateMonth('January');
      setSelectedMonth(months.indexOf('January'));
    } else {
      let newMonthIndex = selectedMonth + 1;
      rootDispatcher.updateMonth(months[newMonthIndex]);

      let a = moment([year, newMonthIndex]);
      let b = moment([currentYear, months.indexOf(currentMonth)]);
      let monthDifference = a.diff(b, 'month');

      rootDispatcher.updateDeposit(monthDifference);

      setSelectedMonth(newMonthIndex);
    }
  };

  const handleBackward = () => {
    if (selectedMonth === months.indexOf('January')) {
      rootDispatcher.updateYear(year - 1);
      rootDispatcher.updateMonth('December');
      setSelectedMonth(months.indexOf('December'));
    } else {
      let newMonthIndex = selectedMonth - 1;
      rootDispatcher.updateMonth(months[newMonthIndex]);

      let a = moment([year, newMonthIndex]);
      let b = moment([currentYear, months.indexOf(currentMonth)]);
      let monthDifference = a.diff(b, 'month');

      rootDispatcher.updateDeposit(monthDifference);

      setSelectedMonth(newMonthIndex);
    }
  };

  return (
    <div>
      <label>Reach goal by</label>
      <div className="dateInput">
        <button
          className="back"
          onClick={() => handleBackward()}
          disabled={year === currentYear && month === minMonth ? true : false}
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

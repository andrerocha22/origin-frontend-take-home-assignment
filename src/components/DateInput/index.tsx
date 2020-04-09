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

  const monthDiff = (year: number, monthIndex: number) => {
    const a = moment([year, monthIndex]);
    const b = moment([currentYear, months.indexOf(currentMonth)]);
    const monthDifference = a.diff(b, 'month');

    return monthDifference;
  };

  const handleFoward = () => {
    if (selectedMonth === months.indexOf('December')) {
      const nextYear = year + 1;
      rootDispatcher.updateYear(nextYear);
      rootDispatcher.updateMonth('January');

      rootDispatcher.updateDeposit(
        monthDiff(nextYear, months.indexOf('January'))
      );

      setSelectedMonth(months.indexOf('January'));
    } else {
      const newMonthIndex = selectedMonth + 1;
      rootDispatcher.updateMonth(months[newMonthIndex]);

      rootDispatcher.updateDeposit(monthDiff(year, newMonthIndex));

      setSelectedMonth(newMonthIndex);
    }
  };

  const handleBackward = () => {
    if (selectedMonth === months.indexOf('January')) {
      const previousYear = year - 1;
      rootDispatcher.updateYear(previousYear);
      rootDispatcher.updateMonth('December');

      rootDispatcher.updateDeposit(
        monthDiff(previousYear, months.indexOf('December'))
      );

      setSelectedMonth(months.indexOf('December'));
    } else {
      const previousMonthIndex = selectedMonth - 1;
      rootDispatcher.updateMonth(months[previousMonthIndex]);

      rootDispatcher.updateDeposit(monthDiff(year, previousMonthIndex));

      setSelectedMonth(previousMonthIndex);
    }
  };

  const keyHandler = e => {
    if (e.key === 'ArrowRight') {
      handleFoward();
    } else if (e.key === 'ArrowLeft') {
      year === currentYear && month === minMonth ? null : handleBackward();
    }
  };

  return (
    <div className="date">
      <label>Reach goal by</label>
      <div className="dateInput">
        <button
          className="back"
          onClick={() => handleBackward()}
          onKeyUp={keyHandler}
          disabled={year === currentYear && month === minMonth ? true : false}
        >
          <img src={require('~/assets/icons/arrow.svg')} alt="arrow-left" />
        </button>
        <span className="dateDisplay">
          <h1>{month}</h1>
          <h2>{year}</h2>
        </span>
        <button
          className="forward"
          onKeyUp={keyHandler}
          onClick={() => handleFoward()}
        >
          <img src={require('~/assets/icons/arrow.svg')} alt="arrow-right" />
        </button>
      </div>
    </div>
  );
};

export default DateInput;

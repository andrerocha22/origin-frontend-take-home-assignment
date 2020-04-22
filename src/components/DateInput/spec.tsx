import React from 'react';
import { mount } from 'enzyme';

import DateInput from './index';
import { Provider } from 'react-redux';

import { createStore } from 'redux';

import { rootReducer } from '../../store/root-reducer';

describe('<DateInput>', () => {
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

  const currentMonth = new Date().toLocaleString('en-US', { month: 'long' });
  const currentYear = new Date().getFullYear();
  const initialMonth = months[months.indexOf(currentMonth) + 1];

  const initialState = {
    year: 1999,
    month: 'January',
    amount: 0.0,
    deposit: 1
  };

  let store, wrapper;

  beforeEach(() => {
    store = createStore(rootReducer, initialState);
    wrapper = mount(
      <Provider store={store}>
        <DateInput />
      </Provider>
    );
  });

  it('Should render without errors', () => {
    expect(wrapper.find('.date').length).toEqual(1);
  });

  it('Should return the next current month and same year', () => {
    wrapper.find('.forward').simulate('click');
    let nextMonth = months[months.indexOf(initialMonth) + 1];
    expect(wrapper.find('.month').text()).toBe(nextMonth);
    expect(wrapper.find('.year').text()).toBe(currentYear.toString(10));
  });

  it('Should return the next current month and next year', () => {
    for (let i = 0; i < 12; i++) {
      wrapper.find('.forward').simulate('click');
    }
    expect(wrapper.find('.month').text()).toBe(initialMonth);
    expect(wrapper.find('.year').text()).toBe((currentYear + 1).toString(10));
  });

  it('Should return the next current month and same year', () => {
    wrapper.find('.backward').simulate('click');
    expect(wrapper.find('.month').text()).toBe(initialMonth);
    expect(wrapper.find('.year').text()).toBe(currentYear.toString(10));
  });

  it('Should return the next current month and next year', () => {
    for (let i = 0; i < 24; i++) {
      wrapper.find('.forward').simulate('click');
    }
    for (let i = 0; i < 12; i++) {
      wrapper.find('.backward').simulate('click');
    }
    expect(wrapper.find('.month').text()).toBe(initialMonth);
    expect(wrapper.find('.year').text()).toBe((currentYear + 1).toString(10));
  });

  it('Should return the next current month and next year using arrow keyboard input', () => {
    for (let i = 0; i < 12; i++) {
      wrapper.find('.forward').simulate('keyup', { key: 'ArrowRight' });
    }
    expect(wrapper.find('.month').text()).toBe(initialMonth);
    expect(wrapper.find('.year').text()).toBe((currentYear + 1).toString(10));
  });

  it('Should return the next current month and next year using arrow keyboard input', () => {
    for (let i = 0; i < 12; i++) {
      wrapper.find('.forward').simulate('keyup', { key: 'ArrowRight' });
    }
    for (let i = 0; i < 13; i++) {
      wrapper.find('.backward').simulate('keyup', { key: 'ArrowLeft' });
    }
    expect(wrapper.find('.month').text()).toBe(initialMonth);
    expect(wrapper.find('.year').text()).toBe(currentYear.toString(10));
  });
});

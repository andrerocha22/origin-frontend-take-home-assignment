import React from 'react';
import { mount } from 'enzyme';

import ValueInput from './index';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';

import { createStore } from 'redux';

import { rootReducer } from '../../store/root-reducer';

describe('<ValueInput/>', () => {
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
        <ValueInput />
      </Provider>
    );
  });

  it('Should render without errors', () => {  
    expect(wrapper.find('.value').length).toEqual(1);
  });

  it('Should return the correct format input value (5000 -> 5,000,00)', () => {
    const input = wrapper.find('input');
    input.instance().value = '500000';
    input.simulate('change');
    expect(input.instance().value).toBe('5,000.00');
  });

  it('Should return just 9 characters', () => {
    const input = wrapper.find('input');
    //Testing with 10 characters
    input.instance().value = '500000';
    input.simulate('change');
    expect(input.instance().value).toBe('5,000.00');
    input.instance().value = '5000';
    input.simulate('change');
    expect(input.instance().value).toBe('50.00');
    input.instance().value = '500050';
    input.simulate('change');
    expect(input.instance().value).toBe('5,000.50');
  });
});

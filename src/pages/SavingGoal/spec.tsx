import React from 'react';
import { mount } from 'enzyme';

import SavingGoal from './index';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';

import { createStore } from 'redux';

import { rootReducer, RootDispatcher } from '../../store/root-reducer';

describe('<SavingGoal/>', () => {
  const initialState = {
    year: 1999,
    month: 'January',
    amount: 0.0,
    deposit: 1
  };

  let store, wrapper, rootDispatcher;

  beforeEach(() => {
    store = createStore(rootReducer, initialState);
    wrapper = mount(
      <Provider store={store}>
        <SavingGoal />
      </Provider>
    );
    rootDispatcher = new RootDispatcher(store.dispatch);
  });

  it('Renders correctly', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Should render without errors', () => {
    expect(wrapper.find('.savingGoalSimulator').length).toEqual(1);
  });

  it('Should return the correct format deposit value (5000 -> 5000/1 month -> $5000.00)', () => {
    rootDispatcher.updateAmount(5000);
    expect(wrapper.find('.depositValue').text()).toEqual('$5000.00');
  });

  it('Should return the correct format deposit value (5000 -> 5000/5 months -> $1000.00)', () => {
    rootDispatcher.updateAmount(5000);

    for (let i = 0; i < 4; i++) {
      wrapper.find('.forward').simulate('click');
    }

    expect(wrapper.find('.depositValue').text()).toEqual('$1000.00');
    expect(wrapper.find('p').text()).toEqual(
      'You are plaining 5 monthly deposits to reach your $5000 goal by September 2020.'
    );
  });

  it('Should return the correct format deposit value (5000 -> 5000/4 months -> $1250.00)', () => {
    rootDispatcher.updateAmount(5000);

    for (let i = 0; i < 3; i++) {
      wrapper.find('.forward').simulate('click');
    }
    wrapper.find('.backward').simulate('click');
    wrapper.find('.forward').simulate('click');

    expect(wrapper.find('.depositValue').text()).toEqual('$1250.00');
    expect(wrapper.find('p').text()).toEqual(
      'You are plaining 4 monthly deposits to reach your $5000 goal by August 2020.'
    );
  });

  it('Should enable the button when the value is changed', () => {
    const input = wrapper.find('input');
    input.instance().value = '500000';
    input.simulate('change');

    const button = wrapper.find('.confirmButton');
    expect(button.props()['disabled']).toBe(false);
  });
});

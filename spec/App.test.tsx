import React from 'react';

import App from '../src/App';

import { shallow } from 'enzyme';

describe('App', () => {
  it('renders', () => {
    const component = shallow(<App />);

    expect(component.exists()).toEqual(true);
  });
});

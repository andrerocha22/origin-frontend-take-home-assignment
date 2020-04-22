import React from 'react';

import App from '../src/App';

import { shallow } from 'enzyme';

import toJson from 'enzyme-to-json';

describe('<App />', () => {
  describe('render()', () => {
    test('renders the component app', () => {
      const wrapper = shallow(<App />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});

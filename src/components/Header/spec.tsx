import React from 'react';

import { shallow } from 'enzyme';

import Header from './index';

const setUp = () => {
  const component = shallow(<Header />);
  return component;
};

describe('Header component', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it('Should render without errors', () => {
    const wrapper = component.find('.header');
    expect(wrapper.length).toBe(1);
  });

  it('Should render a logo', () => {
    const logo = component.find('.logoIMG');
    expect(logo.length).toBe(1);
  });
});

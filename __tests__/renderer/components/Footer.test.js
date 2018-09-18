import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components


import Footer from '../../../src/renderer/components/Footer';


describe('<Footer />', () => {
    describe('render()', () => {
        test('renders the component', () => {
            const wrapper = shallow(<Footer />);
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });
});

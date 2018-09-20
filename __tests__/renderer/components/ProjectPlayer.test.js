import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components


import ProjectPlayer from '../../../src/renderer/components/ProjectPlayer';


describe('<ProjectPlayer />', () => {
    describe('render()', () => {
        test('renders the component', () => {
            const wrapper = shallow(<ProjectPlayer />);
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });
});

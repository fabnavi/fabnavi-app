import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components


import ProjectManager from '../../../src/renderer/components/ProjectManager';


describe('<ProjectManager />', () => {
    describe('render()', () => {
        test('renders the component', () => {
            const wrapper = shallow(<ProjectManager />);
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });
});

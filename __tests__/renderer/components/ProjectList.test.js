import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components


import { ProjectList } from '../../../src/renderer/components/ProjectList';


describe('<ProjectList />', () => {
    describe('render()', () => {
        it('renders the component', () => {
            const wrapper = shallow(<ProjectList />);
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });
});

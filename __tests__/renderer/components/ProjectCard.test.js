import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components


import ProjectCard from '../../../src/renderer/components/ProjectCard';


describe('<ProjectCard />', () => {
    it('renders the component', () => {
        const user = {
            image: '',
            id: ''
        }
        const mockToggleMenu = jest.fn();
        const content = [{
            type: 'Content::Frame'
        }]
        const wrapper = shallow(<ProjectCard
            user={user}
            content={content}
            toggleMenu={mockToggleMenu}
            description='project description'
            selectedId={123}
            currentUserId={123}
        />);
        expect(toJson(wrapper)).toMatchSnapshot();

        const wrapper2 = shallow(<ProjectCard
            user={user}
            content={[]}
            toggleMenu={mockToggleMenu}
        />);
        expect(toJson(wrapper2)).toMatchSnapshot();
    });
});

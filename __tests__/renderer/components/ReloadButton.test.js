import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

import { ReloadButton, mapDispatchToProps } from '../../../src/renderer/components/ReloadButton';
import { reloadProjects } from '../../../src/renderer/actions/manager';

describe('<ReloadButton />', () => {

    it('render()s the component', () => {
        const wrapper = shallow(<ReloadButton />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('successfully calls the onClick() handler', () => {
        const mockReloadProjects = jest.fn();
        const wrapper = shallow(<ReloadButton reloadProjects={mockReloadProjects}/>);
        wrapper.find('a').simulate('click', { preventDefault() {} })
        expect(mockReloadProjects).toBeCalled();
    })

    it('mapDispatchToProps', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).reloadProjects();
        expect(dispatch.mock.calls[0][0]).toEqual(reloadProjects());
    })
});

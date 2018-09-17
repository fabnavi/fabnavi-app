import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

import { HostSelector, mapDispatchToProps } from '../../../src/renderer/components/HostSelector';


import { reloadProjects } from '../../../src/renderer/actions/manager';
import { signedOut, signingOut } from '../../../src/renderer/actions/users';


describe('<HostSelector />', () => {
    describe('render()', () => {
        it('renders the component', () => {
            const wrapper = shallow(<HostSelector />);
            expect(toJson(wrapper)).toMatchSnapshot();
        });

        it('handles changes', async () => {
            const mockReloadProjects = jest.fn();
            const wrapper = shallow(<HostSelector
                reloadProjects={mockReloadProjects}
                isLoggedIn={true}
            />);
            // TODO: mock api.signOut
            await wrapper.simulate('change', { target:{ value: 'http://preview.fabnavi.org' } })
            expect(toJson(wrapper)).toMatchSnapshot();
        });
        it('failes changes without login', async () => {
            const mockReloadProjects = jest.fn();
            const wrapper = shallow(<HostSelector
                reloadProjects={mockReloadProjects}
                isLoggedIn={false}
            />);
            await wrapper.simulate('change', { target:{ value: 'http://preview.fabnavi.org' } })
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });

    describe('mapDispatchToProps', () => {
        it('reloadProjects works', () => {
            const dispatch = jest.fn();
            mapDispatchToProps(dispatch).reloadProjects();
            expect(dispatch.mock.calls[0][0]).toEqual(reloadProjects());
        });
        it('signingOut works', () => {
            const dispatch = jest.fn();
            mapDispatchToProps(dispatch).signingOut();
            expect(dispatch.mock.calls[0][0]).toEqual(signingOut());
        });
        it('signedOut works', () => {
            const dispatch = jest.fn();
            mapDispatchToProps(dispatch).signedOut();
            expect(dispatch.mock.calls[0][0]).toEqual(signedOut());
        });
    })
});

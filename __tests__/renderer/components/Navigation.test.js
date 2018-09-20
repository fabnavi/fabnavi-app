import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';

import { Navigation, mapStateToProps } from '../../../src/renderer/components/Navigation';

describe('<Navigation />', () => {
    describe('render()', () => {
        test('renders the component for visitor', () => {
            const wrapper = shallow(<Navigation />);
            expect(toJson(wrapper)).toMatchSnapshot();
        });

        test('renders the component for login user', () => {
            const wrapper = shallow(<Navigation isLoggedIn={true}/>);
            expect(toJson(wrapper)).toMatchSnapshot();
        });

        test('renders the component for admin user', () => {
            const wrapper = shallow(<Navigation isLoggedIn={true} isAdmin={true}/>);
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });

    it('mapStateToProps', () => {
        const initialUserState = {
            isLoggedIn: true,
            isAdmin: false,
            isDeveloper: false
        }
        expect(mapStateToProps({ user: initialUserState })).toEqual(initialUserState);
    })
});

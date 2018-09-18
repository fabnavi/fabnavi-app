import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

import { MenuIcon, mapStateToProps, mapDispatchToProps } from '../../../src/renderer/components/MenuIcon';


import { signInFailed, signedIn, signedOut, signingOut } from '../../../src/renderer/actions/users';
import { changeProjectListPage } from '../../../src/renderer/actions/manager';
import { push } from 'react-router-redux';

describe('<MenuIcon />', () => {
    describe('render()', () => {
        test('renders the component', () => {
            const wrapper = shallow(<MenuIcon />);
            expect(toJson(wrapper)).toMatchSnapshot();
        });
        test('render sing_in', () => {
            const wrapper = mount(<MenuIcon act='sign_in' />);
            expect(
                wrapper.find('p').text()
            ).toEqual('Sign In');
        });
        test('render sing_out', () => {
            const mockSigningOut = jest.fn();
            const wrapper = mount(<MenuIcon
                act='sign_out'
                signingOut={mockSigningOut}
            />);
            wrapper.find('a').simulate('click')
            expect(
                wrapper.find('p').text()
            ).toEqual('Sign Out');
        });
        test('render logo', () => {
            const mockJump = jest.fn();
            const mockJumpToHome = jest.fn();
            const path = '/path/to/img/src.svg'
            const wrapper = mount(<MenuIcon
                logo={true}
                src={path}
                to={'/'}
                jumpToHome={mockJumpToHome}
                jump={mockJump}
            />);
            wrapper.find('a').simulate('click')
            expect(
                wrapper.find('img').prop('src')
            ).toEqual(path);
            expect(
                wrapper.find('img').prop('type')
            ).toEqual('logo');
        });
        test('render icon', () => {
            const path = '/path/to/img/src.svg'
            const wrapper = mount(<MenuIcon src={path} />);
            expect(
                wrapper.find('img').prop('src')
            ).toEqual(path);
        });
    });

    it('mapStateToProps works', () =>{
        const initialState = { manager: { currentPage: 1 } };
        expect(mapStateToProps(initialState)).toEqual({ currentPage: 1 });
    });

    describe('mapDispatchToProps', () =>{
        it('jumpToHome works', () => {
            const dispatch = jest.fn();
            mapDispatchToProps(dispatch).jumpToHome();
            expect(dispatch.mock.calls[0][0]).toEqual(changeProjectListPage(0));
        });
        it('jump works', () => {
            const dispatch = jest.fn();
            mapDispatchToProps(dispatch).jump('/');
            expect(dispatch.mock.calls[0][0]).toEqual(push('/'));
        });

        it('signedIn works', () => {
            const credential = {};
            const dispatch = jest.fn();
            mapDispatchToProps(dispatch).signedIn(credential);
            expect(dispatch.mock.calls[0][0]).toEqual(signedIn(credential));
        });
        it('signInFailed works', () => {
            const error = {a: 1};
            const info = {b: 2};
            const dispatch = jest.fn();
            mapDispatchToProps(dispatch).signInFailed(error, info);
            const now = new Date();
            expect(dispatch.mock.calls[0][0]).toEqual(signInFailed({
                message: 'sign in failed. see console',
                error,
                info,
                time: now.toTimeString()
            }));
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
    });
});

import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components
import { goBack } from 'react-router-redux';

import { BackButton } from '../../../src/renderer/components/BackButton';
import { mapStateToProps, mapDispatchToProps } from '../../../src/renderer/components/BackButton';

const mockStore = configureStore();

describe('<BackButton />', () => {

    let wrapper, store, back;

    beforeEach(() => {
        store = mockStore({});
        back = jest.fn();
        wrapper = shallow(
            <BackButton store={store} back={back}/>
        );
    });

    it('renders() the component', () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('successfully calls the onClick() handler', () => {
        wrapper.find('a').simulate('click');
        expect(back).toBeCalled();
    })

    it('mapStateToProps', () => {
        const initialState = {};
        expect(mapStateToProps(initialState)).toEqual({});
    })

    it('mapDispatchToProps', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).back();
        expect(dispatch.mock.calls[0][0]).toEqual(goBack());
    })
});

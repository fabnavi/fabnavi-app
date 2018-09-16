import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

import { UpdateButton } from '../../../src/renderer/components/UpdateButton';
import { mapStateToProps } from '../../../src/renderer/components/UpdateButton';


describe('<UpdateButton />', () => {

    it('renders() the component', () => {
        const wrapper = shallow(<UpdateButton />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });


    it('successfully calls the onClick() handler', () => {
        const mockOnClick = jest.spyOn(UpdateButton.prototype, 'handleClick');
        const wrapper = shallow(<UpdateButton canUpdatePage={true}/>);
        wrapper.find('a').simulate('click');
        expect(mockOnClick).toBeCalled();
    })

    it('mapStateToProps', () => {
        const initialState = {
            manager: {
                canUpdatePage: false
            }
        }
        expect(mapStateToProps(initialState)).toEqual({ canUpdatePage: false });
    })
});

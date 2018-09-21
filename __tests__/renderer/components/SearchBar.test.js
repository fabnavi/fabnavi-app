import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

import { SearchBar, mapDispatchToProps } from '../../../src/renderer/components/SearchBar';
import { requestSearchProjects } from '../../../src/renderer/actions/manager';


describe('<SearchBar />', () => {
    describe('render()', () => {
        test('renders the component', () => {
            const wrapper = shallow(<SearchBar />);
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });

    it('successfully calls the onClick() handler', () => {
        const mockSearchProjects = jest.fn();
        const wrapper = shallow(<SearchBar searchProjects={mockSearchProjects}/>);
        wrapper.find('a').simulate('click', { preventDefault(){} })
        expect(mockSearchProjects).toBeCalled();
        expect(mockSearchProjects.mock.calls.length).toEqual(1);
    })

    it('successfully calls handleWordChange()', async () => {
        const wrapper = mount(<SearchBar/>);
        const event = { target: { value: 'spam' } };
        // await wrapper.instance().componentDidMount()
        wrapper.find('input').simulate('change', event);
        expect(wrapper.find('input').props().value).toEqual('spam');
    })

    describe('successfully calls handleKeyDown()', () => {
        const wrapper = mount(<SearchBar/>);
        it('with ENTER key', () => {
            const event = { keyCode: 13 };
            wrapper.find('input').simulate('keydown', event);
            expect(wrapper.find('input').props().value).toEqual('');
        })
        it('with other key', () => {
            const event = { keyCode: 65 };
            wrapper.find('input').simulate('keydown', event);
            expect(wrapper.find('input').props().value).toEqual('');
        })
    })

    it('mapDispatchToProps', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).searchProjects('');
        expect(dispatch.mock.calls[0]).toEqual(undefined);

        mapDispatchToProps(dispatch).searchProjects('abc');
        expect(dispatch.mock.calls[0][0]).toEqual(requestSearchProjects('abc'));
    })
});

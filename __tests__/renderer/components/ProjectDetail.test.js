import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

import { push } from 'react-router-redux';

import { ProjectDetail, EditButton, mapStateToProps, mapDispatchToProps } from '../../../src/renderer/components/ProjectDetail';


describe('<ProjectDetail />', () => {
    describe('render()', () => {
        test('valid proejct', () => {
            const project = {
                user: {
                    id: 123
                }
            };
            const wrapper = shallow(<ProjectDetail project={project}/>);
            expect(toJson(wrapper)).toMatchSnapshot();
        });

        it('with admin login', () => {
            const project = {
                user: {
                    id: 123
                }
            };
            const wrapper = shallow(<ProjectDetail project={project} userIsAdmin={true}/>);
            expect(toJson(wrapper)).toMatchSnapshot();
        });

        it('without project', () => {
            const wrapper = shallow(<ProjectDetail/>);
            expect(toJson(wrapper)).toMatchSnapshot();
        });

        it('with a invalid project', () => {
            const wrapper = shallow(<ProjectDetail project='abc' userIsAdmin={true} />);
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });

    it('mapStateToProps', () => {
        const initialState = {
            manager: {
                targetProject: 1,
            },
            user: {
                id: 234,
                isAdmin: false
            },
        };
        expect(mapStateToProps(initialState)).toEqual({
            project: 1,
            userId: 234,
            userIsAdmin: false
        });
    })

    it('mapDispatchToProps', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).showEdit('123');
        expect(dispatch.mock.calls[0][0]).toEqual(push('/edit/123'));
    })
});


describe('<EditButton />', () => {
    it('render properly', () => {
        const mockHandleClick = jest.fn()
        const wrapper = shallow(<EditButton handleClick={mockHandleClick}/>);
        expect(toJson(wrapper)).toMatchSnapshot();
        wrapper.simulate('click')
        expect(mockHandleClick).toBeCalled();
    })
})

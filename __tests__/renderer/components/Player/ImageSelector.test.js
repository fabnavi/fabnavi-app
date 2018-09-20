import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components


import { ImageSelector, mapStateToProps } from '../../../../src/renderer/components/Player/ImageSelector';


describe('<ImageSelector />', () => {
    describe('render()', () => {
        test('renders the component', () => {
            const project = {};
            const contents = [{
                figure: {}
            }];
            const wrapper = shallow(<ImageSelector
                project={project}
                contents={contents}
            />);
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });
    it('mapStateToProps works', () => {
        const initialState = {
            player: {
                project: {}
            }
        };
        expect(mapStateToProps(initialState)).toEqual({ project: {} });
    })
});

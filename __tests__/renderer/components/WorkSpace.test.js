import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components


import WorkSpace from '../../../src/renderer/components/WorkSpace';


describe('<WorkSpace />', () => {
    describe('render()', () => {
        test('renders the component', () => {
            // TODO: simulate canvas element with
            // `canvas-prebuilt` with jsdom or `jest-canvas-mock`
            const mockUpateCanvas = jest.fn();
            WorkSpace.prototype.updateCanvas = mockUpateCanvas;
            const wrapper = shallow(<WorkSpace />);
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });
});

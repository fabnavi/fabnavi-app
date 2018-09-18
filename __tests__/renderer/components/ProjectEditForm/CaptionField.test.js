import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components


import CaptionField from '../../../../src/renderer/components/ProjectEditForm/CaptionField';

describe('<CaptionsField />', () => {
    describe('render()', () => {
        it('renders the correct component', () => {
            const caption = {
                id: 123,
                start_sec: 1,
                end_sec: 2,
                text: 'abc'
            };
            const wrapper = shallow(<CaptionField
                caption={caption}
                index={0}
                figureIndex={0}
                contentType='Content::Frame'
            />);
            expect(toJson(wrapper)).toMatchSnapshot();
        });
        it('renders the new component', () => {
            const caption = {
                id: undefined,
                start_sec: 1,
                end_sec: 2,
                text: 'abc'
            };
            const wrapper = shallow(<CaptionField
                caption={caption}
                index={0}
                figureIndex={0}
                contentType='Content::Frame'
            />);
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });
});

import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components


import CaptionsField from '../../../../src/renderer/components/ProjectEditForm/CaptionsField';

describe('<CaptionsField />', () => {
    describe('render()', () => {
        test('renders the component', () => {

            const caption = {
                id: 123,
                start_sec: 1,
                end_sec: 2,
                text: 'abc'
            };
            const figures = [
                {
                    position: 1,
                    figure_id: 16332,
                    id: 5756,
                    file: {
                        url: 'https://crest-multimedia-web.s3.amazonaws.com/tsuka/fabnavi5-staging/uploads/attachment/movie/file/5756/2018-09-05_00_59_51.mp4',
                        thumb: {
                            url: 'https://crest-multimedia-web.s3.amazonaws.com/tsuka/fabnavi5-staging/uploads/attachment/movie/file/5756/thumb_2018-09-05_00_59_51.jpg'
                        }
                    },
                    captions: [caption],
                    chapters: []
                },
                {
                    position: 2,
                    figure_id: 16333,
                    id: 5757,
                    file: {
                        url: 'https://crest-multimedia-web.s3.amazonaws.com/tsuka/fabnavi5-staging/uploads/attachment/movie/file/5756/2018-09-05_00_59_51.mp4',
                        thumb: {
                            url: 'https://crest-multimedia-web.s3.amazonaws.com/tsuka/fabnavi5-staging/uploads/attachment/movie/file/5756/thumb_2018-09-05_00_59_51.jpg'
                        }
                    },
                    captions: [],
                    chapters: []
                }
            ];
            const wrapper = shallow(<CaptionsField
                figures={figures}
                contentType='Content::Frame'
            />);
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });
});

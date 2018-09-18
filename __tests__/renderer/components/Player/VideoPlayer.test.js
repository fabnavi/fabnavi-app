import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components


import { VideoPlayer, mapStateToProps } from '../../../../src/renderer/components/Player/VideoPlayer';
jest.useFakeTimers();

describe('<VideoPlayer />', () => {
    describe('render()', () => {
        const project = {
            content: [
                {
                    figure: {
                        position: 1,
                        figure_id: 16332,
                        id: 5756,
                        file: {
                            url: 'https://crest-multimedia-web.s3.amazonaws.com/tsuka/fabnavi5-staging/uploads/attachment/movie/file/5756/2018-09-05_00_59_51.mp4',
                            thumb: {
                                url: 'https://crest-multimedia-web.s3.amazonaws.com/tsuka/fabnavi5-staging/uploads/attachment/movie/file/5756/thumb_2018-09-05_00_59_51.jpg'
                            }
                        },
                        captions: [],
                        chapters: [
                            {
                                start_sec: 0,
                                text: ''
                            }
                        ]
                    },
                    type: 'Figure::Frame'
                },
                {
                    figure: {
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
                        chapters: [
                            {
                                start_sec: 0,
                                text: ''
                            }
                        ]
                    },
                    type: 'Figure::Frame'
                }
            ],
        };


        test('renders the component', () => {
            const videoPlayer = mount(
                <VideoPlayer
                    project={project}
                    index={0}
                />);
            expect(videoPlayer.find('.video-js').length).toBe(2);

            const nextProps = {
                index: 1
            };

            const instance = videoPlayer.instance();
            instance.componentDidMount();
            instance.getCurrentTime()
            instance.componentWillReceiveProps(nextProps);
            instance.updatePlaylist(project);

            HTMLMediaElement.prototype.load = () => {};
            videoPlayer.instance().componentWillUnmount();

            videoPlayer.children().first().simulate('click', {});
            videoPlayer.find('.field_summary').find('input').simulate('change', {
                target: {
                    checked: true
                }
            });

        });
    });
    it('mapStateToProps', () => {
        const initialState = {
            player: {
                project: {}
            }
        };
        expect(mapStateToProps(initialState)).toEqual({ project: {} });
    })
});

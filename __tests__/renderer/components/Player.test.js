import React from 'react';
import { shallow, mount, render } from 'enzyme';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components
const mockStore = configureStore();

import { Player, mapStateToProps, mapDispatchToProps } from '../../../src/renderer/components/Player';
import { playerChangePage } from '../../../src/renderer/actions/player';

jest.mock('../../../src/renderer/components/Player/ImageSelector', () => 'div')
jest.mock('../../../src/renderer/player/MainView', () => {
    return jest.fn().mockImplementation(() => {
        return {
            clear: jest.fn(),
            redraw: jest.fn(),
            drawWaitingMessage: jest.fn(),
            drawInstructionMessage: jest.fn(),
            drawCaptions: jest.fn(),
        }
    })
})

describe('<Player />', () => {
    describe('render()', () => {
        describe('renders the "movie" component', () => {
            const contentType = 'movie'
            const project = {
                content: [],
                isEditable: true,
                handleThumbnailDeleteButtonClick: jest.fn()
            };
            it('with project', () => {
                const wrapper = shallow(<Player
                    contentType={contentType}
                    project={project}
                />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
            it('without project', () => {
                const wrapper = shallow(<Player
                    contentType={contentType}
                />);
                expect(toJson(wrapper)).toMatchSnapshot();
            });
        });

        describe('renders the "photo" component', () => {
            window.HTMLCanvasElement.prototype.getContext = () => {}
            const contentType = 'photo'
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
                            chapters: []
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
                            chapters: []
                        },
                        type: 'Figure::Frame'
                    }
                ],
            };
            it('in small size', () => {
                const wrapper = mount(<Player
                    contentType={contentType}
                    project={project}
                    size='small'
                    mode='play'
                    handleThumbnailDeleteButtonClick={jest.fn()}
                    isEditable={true}
                    page={0}
                    changePage={jest.fn()}
                />)
                expect(toJson(wrapper)).toMatchSnapshot();
                wrapper.update();
                expect(toJson(wrapper)).toMatchSnapshot();
                wrapper.find('canvas').simulate('click');
            })
            it('in normal size', () => {
                const wrapper = shallow(<Player
                    contentType={contentType}
                    project={project}
                />);
                expect(toJson(wrapper)).toMatchSnapshot();
            })
            it('with project = null', () => {
                const wrapper = shallow(<Player
                    contentType={contentType}
                    project={null}
                />);
                expect(toJson(wrapper)).toMatchSnapshot();
            })
        });
    });

    it('mapStateToProps works', () => {
        const initialPlayerState = {
            project: {},
            page: 1,
            config: {},
            contentType: '',
            mode: ''
        };
        const initialState = { player: initialPlayerState };
        expect(mapStateToProps(initialState)).toEqual(initialPlayerState);
    });

    it('mapDispatchToProps works', () => {
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).changePage(2);
        expect(dispatch.mock.calls[0][0]).toEqual(playerChangePage({ step: 2 }));
    })
});

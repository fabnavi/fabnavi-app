import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components

import Paginator from '../../../src/renderer/components/Paginator';
import ProjectCard from '../../../src/renderer/components/ProjectCard';


describe('<Paginator />', () => {
    describe('render()', () => {
        // TODO: reduce projects data
        const projects = {
            byId: {
                '3279': {
                    id: 3279,
                    name: '2018-09-05 00:59:46',
                    description: '',
                    'private': true,
                    updated_at: '2018-09-04T15:59:46.000Z',
                    created_at: '2018-09-04T15:59:46.000Z',
                    user: {
                        id: 28,
                        uid: '23551607',
                        nickname: 'tkatsuya',
                        image: 'https://avatars1.githubusercontent.com/u/23551607?v=4'
                    },
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
                        }
                    ],
                    type: 'Content::Movie',
                    sensor_infos: [],
                    tags: {
                        tags: []
                    }
                },
                '3280': {
                    id: 3280,
                    name: '2018-09-05 00:59:57',
                    description: '',
                    'private': true,
                    updated_at: '2018-09-04T15:59:57.000Z',
                    created_at: '2018-09-04T15:59:57.000Z',
                    user: {
                        id: 28,
                        uid: '23551607',
                        nickname: 'tkatsuya',
                        image: 'https://avatars1.githubusercontent.com/u/23551607?v=4'
                    },
                    content: [
                        {
                            figure: {
                                position: 1,
                                figure_id: 16333,
                                id: 5757,
                                file: {
                                    url: 'https://crest-multimedia-web.s3.amazonaws.com/tsuka/fabnavi5-staging/uploads/attachment/movie/file/5757/2018-09-05_01_00_51.mp4',
                                    thumb: {
                                        url: 'https://crest-multimedia-web.s3.amazonaws.com/tsuka/fabnavi5-staging/uploads/attachment/movie/file/5757/thumb_2018-09-05_01_00_51.jpg'
                                    }
                                },
                                captions: [],
                                chapters: []
                            },
                            type: 'Figure::Frame'
                        }
                    ],
                    type: 'Content::Movie',
                    sensor_infos: [],
                    tags: {
                        tags: []
                    }
                },
                '3285': {
                    id: 3285,
                    name: '2018-09-05 14:45:17',
                    description: '',
                    'private': true,
                    updated_at: '2018-09-05T05:45:17.000Z',
                    created_at: '2018-09-05T05:45:17.000Z',
                    user: {
                        id: 28,
                        uid: '23551607',
                        nickname: 'tkatsuya',
                        image: 'https://avatars1.githubusercontent.com/u/23551607?v=4'
                    },
                    content: [
                        {
                            figure: {
                                position: 1,
                                figure_id: 16335,
                                id: 5759,
                                file: {
                                    url: 'https://crest-multimedia-web.s3.amazonaws.com/tsuka/fabnavi5-staging/uploads/attachment/movie/file/5759/2018-09-05_14_45_31.mp4',
                                    thumb: {
                                        url: 'https://crest-multimedia-web.s3.amazonaws.com/tsuka/fabnavi5-staging/uploads/attachment/movie/file/5759/thumb_2018-09-05_14_45_31.jpg'
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
                                figure_id: 16336,
                                id: 5760,
                                file: {
                                    url: 'https://crest-multimedia-web.s3.amazonaws.com/tsuka/fabnavi5-staging/uploads/attachment/movie/file/5760/2018-09-05_14_45_32.mp4',
                                    thumb: {
                                        url: 'https://crest-multimedia-web.s3.amazonaws.com/tsuka/fabnavi5-staging/uploads/attachment/movie/file/5760/thumb_2018-09-05_14_45_32.jpg'
                                    }
                                },
                                captions: [],
                                chapters: []
                            },
                            type: 'Figure::Frame'
                        }
                    ],
                    type: 'Content::Movie',
                    sensor_infos: [],
                    tags: {
                        tags: []
                    }
                },
                '3301': {
                    id: 3301,
                    name: '2018-09-11 14:18:01',
                    description: '',
                    'private': true,
                    updated_at: '2018-09-11T05:18:01.000Z',
                    created_at: '2018-09-11T05:18:01.000Z',
                    user: {
                        id: 28,
                        uid: '23551607',
                        nickname: 'tkatsuya',
                        image: 'https://avatars1.githubusercontent.com/u/23551607?v=4'
                    },
                    content: [
                        {
                            figure: {
                                position: 1,
                                figure_id: 16359,
                                id: 5783,
                                file: {
                                    url: 'https://crest-multimedia-web.s3.amazonaws.com/tsuka/fabnavi5-staging/uploads/attachment/movie/file/5783/2018-09-11_14_24_53.mp4',
                                    thumb: {
                                        url: 'https://crest-multimedia-web.s3.amazonaws.com/tsuka/fabnavi5-staging/uploads/attachment/movie/file/5783/thumb_2018-09-11_14_24_53.jpg'
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
                                figure_id: 16360,
                                id: 5784,
                                file: {
                                    url: 'https://crest-multimedia-web.s3.amazonaws.com/tsuka/fabnavi5-staging/uploads/attachment/movie/file/5784/2018-09-11_14_24_56.mp4',
                                    thumb: {
                                        url: 'https://crest-multimedia-web.s3.amazonaws.com/tsuka/fabnavi5-staging/uploads/attachment/movie/file/5784/thumb_2018-09-11_14_24_56.jpg'
                                    }
                                },
                                captions: [],
                                chapters: []
                            },
                            type: 'Figure::Frame'
                        },
                        {
                            figure: {
                                position: 3,
                                figure_id: 16361,
                                id: 5785,
                                file: {
                                    url: 'https://crest-multimedia-web.s3.amazonaws.com/tsuka/fabnavi5-staging/uploads/attachment/movie/file/5785/2018-09-11_14_25_00.mp4',
                                    thumb: {
                                        url: 'https://crest-multimedia-web.s3.amazonaws.com/tsuka/fabnavi5-staging/uploads/attachment/movie/file/5785/thumb_2018-09-11_14_25_00.jpg'
                                    }
                                },
                                captions: [],
                                chapters: []
                            },
                            type: 'Figure::Frame'
                        },
                        {
                            figure: {
                                position: 4,
                                figure_id: 16362,
                                id: 5786,
                                file: {
                                    url: 'https://crest-multimedia-web.s3.amazonaws.com/tsuka/fabnavi5-staging/uploads/attachment/movie/file/5786/2018-09-11_14_25_01.mp4',
                                    thumb: {
                                        url: 'https://crest-multimedia-web.s3.amazonaws.com/tsuka/fabnavi5-staging/uploads/attachment/movie/file/5786/thumb_2018-09-11_14_25_01.jpg'
                                    }
                                },
                                captions: [],
                                chapters: []
                            },
                            type: 'Figure::Frame'
                        }
                    ],
                    type: 'Content::Movie',
                    sensor_infos: [],
                    tags: {
                        tags: []
                    }
                },
                '3302': {
                    id: 3302,
                    name: '2018-09-11 14:26:48',
                    description: '',
                    'private': true,
                    updated_at: '2018-09-11T05:26:49.000Z',
                    created_at: '2018-09-11T05:26:49.000Z',
                    user: {
                        id: 28,
                        uid: '23551607',
                        nickname: 'tkatsuya',
                        image: 'https://avatars1.githubusercontent.com/u/23551607?v=4'
                    },
                    content: [
                        {
                            figure: {
                                position: 1,
                                figure_id: 16363,
                                id: 5787,
                                file: {
                                    url: 'https://crest-multimedia-web.s3.amazonaws.com/tsuka/fabnavi5-staging/uploads/attachment/movie/file/5787/2018-09-11_14_27_03.mp4',
                                    thumb: {
                                        url: 'https://crest-multimedia-web.s3.amazonaws.com/tsuka/fabnavi5-staging/uploads/attachment/movie/file/5787/thumb_2018-09-11_14_27_03.jpg'
                                    }
                                },
                                captions: [],
                                chapters: []
                            },
                            type: 'Figure::Frame'
                        }
                    ],
                    type: 'Content::Movie',
                    sensor_infos: [],
                    tags: {
                        tags: []
                    }
                },
                '3303': {
                    id: 3303,
                    name: '2018-09-11 14:27:50',
                    description: '',
                    'private': true,
                    updated_at: '2018-09-11T05:27:51.000Z',
                    created_at: '2018-09-11T05:27:51.000Z',
                    user: {
                        id: 28,
                        uid: '23551607',
                        nickname: 'tkatsuya',
                        image: 'https://avatars1.githubusercontent.com/u/23551607?v=4'
                    },
                    content: [
                        {
                            figure: {
                                position: 1,
                                figure_id: 16364,
                                id: 5788,
                                file: {
                                    url: 'https://crest-multimedia-web.s3.amazonaws.com/tsuka/fabnavi5-staging/uploads/attachment/movie/file/5788/2018-09-11_14_32_07.mp4',
                                    thumb: {
                                        url: 'https://crest-multimedia-web.s3.amazonaws.com/tsuka/fabnavi5-staging/uploads/attachment/movie/file/5788/thumb_2018-09-11_14_32_07.jpg'
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
                                figure_id: 16365,
                                id: 5789,
                                file: {
                                    url: 'https://crest-multimedia-web.s3.amazonaws.com/tsuka/fabnavi5-staging/uploads/attachment/movie/file/5789/2018-09-11_14_32_10.mp4',
                                    thumb: {
                                        url: 'https://crest-multimedia-web.s3.amazonaws.com/tsuka/fabnavi5-staging/uploads/attachment/movie/file/5789/thumb_2018-09-11_14_32_10.jpg'
                                    }
                                },
                                captions: [],
                                chapters: []
                            },
                            type: 'Figure::Frame'
                        },
                        {
                            figure: {
                                position: 3,
                                figure_id: 16366,
                                id: 5790,
                                file: {
                                    url: 'https://crest-multimedia-web.s3.amazonaws.com/tsuka/fabnavi5-staging/uploads/attachment/movie/file/5790/2018-09-11_14_32_13.mp4',
                                    thumb: {
                                        url: 'https://crest-multimedia-web.s3.amazonaws.com/tsuka/fabnavi5-staging/uploads/attachment/movie/file/5790/thumb_2018-09-11_14_32_13.jpg'
                                    }
                                },
                                captions: [],
                                chapters: []
                            },
                            type: 'Figure::Frame'
                        },
                        {
                            figure: {
                                position: 4,
                                figure_id: 16367,
                                id: 5791,
                                file: {
                                    url: 'https://crest-multimedia-web.s3.amazonaws.com/tsuka/fabnavi5-staging/uploads/attachment/movie/file/5791/2018-09-11_14_32_17.mp4',
                                    thumb: {
                                        url: 'https://crest-multimedia-web.s3.amazonaws.com/tsuka/fabnavi5-staging/uploads/attachment/movie/file/5791/thumb_2018-09-11_14_32_17.jpg'
                                    }
                                },
                                captions: [],
                                chapters: []
                            },
                            type: 'Figure::Frame'
                        }
                    ],
                    type: 'Content::Movie',
                    sensor_infos: [],
                    tags: {
                        tags: []
                    }
                },
                '3304': {
                    id: 3304,
                    name: '2018-09-11 14:35:09',
                    description: '',
                    'private': true,
                    updated_at: '2018-09-11T05:35:09.000Z',
                    created_at: '2018-09-11T05:35:09.000Z',
                    user: {
                        id: 28,
                        uid: '23551607',
                        nickname: 'tkatsuya',
                        image: 'https://avatars1.githubusercontent.com/u/23551607?v=4'
                    },
                    content: [
                        {
                            figure: {
                                position: 1,
                                figure_id: 16368,
                                id: 5792,
                                file: {
                                    url: 'https://crest-multimedia-web.s3.amazonaws.com/tsuka/fabnavi5-staging/uploads/attachment/movie/file/5792/2018-09-11_14_39_37.mp4',
                                    thumb: {
                                        url: 'https://crest-multimedia-web.s3.amazonaws.com/tsuka/fabnavi5-staging/uploads/attachment/movie/file/5792/thumb_2018-09-11_14_39_37.jpg'
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
                                figure_id: 16369,
                                id: 5793,
                                file: {
                                    url: 'https://crest-multimedia-web.s3.amazonaws.com/tsuka/fabnavi5-staging/uploads/attachment/movie/file/5793/2018-09-11_14_39_40.mp4',
                                    thumb: {
                                        url: 'https://crest-multimedia-web.s3.amazonaws.com/tsuka/fabnavi5-staging/uploads/attachment/movie/file/5793/thumb_2018-09-11_14_39_40.jpg'
                                    }
                                },
                                captions: [],
                                chapters: []
                            },
                            type: 'Figure::Frame'
                        }
                    ],
                    type: 'Content::Movie',
                    sensor_infos: [],
                    tags: {
                        tags: []
                    }
                },
                '3306': {
                    id: 3306,
                    name: '2018-09-12 17:59:36',
                    description: '',
                    'private': true,
                    updated_at: '2018-09-12T08:59:36.000Z',
                    created_at: '2018-09-12T08:59:36.000Z',
                    user: {
                        id: 38,
                        uid: '8005316',
                        nickname: 'watarukbr',
                        image: 'https://avatars2.githubusercontent.com/u/8005316?v=4'
                    },
                    content: [],
                    type: 'Content::PhotoList',
                    sensor_infos: [],
                    tags: {
                        tags: []
                    }
                }
            },
            allIds: [
                3306,
                3304,
                3303,
                3302,
                3301,
                3285,
                3280,
                3279
            ]
        };


        test('renders the component', () => {

            const mockJumpTp = jest.fn();
            const mockCurrentUserId = '28';
            const mockContents = projects;
            const filter = 'myOwn'
            const wrapper = shallow(
                <Paginator
                    filter={filter}
                    perPage={1}
                    currentPage={0}
                    jumpTo={mockJumpTp}
                    currentUserId={mockCurrentUserId}
                    contents={mockContents}
                >
                    <ProjectCard
                        currentUserId={mockCurrentUserId}
                    />
                </Paginator>
            );
            expect(toJson(wrapper)).toMatchSnapshot();
        });

        it('renders prev & next button', () => {
            const mockJumpTp = jest.fn();
            const mockSelectMenuItem = jest.fn();
            const mockCurrentUserId = '28';
            const mockContents = projects;
            const filter = 'all'
            const wrapper = shallow(
                <Paginator
                    filter={filter}
                    perPage={1}
                    currentPage={1}
                    jumpTo={mockJumpTp}
                    currentUserId={mockCurrentUserId}
                    contents={mockContents}
                >
                    <ProjectCard
                        selectMenuItem={mockSelectMenuItem}
                        currentUserId={mockCurrentUserId}
                    />
                </Paginator>
            );
            expect(toJson(wrapper)).toMatchSnapshot();
        });

        it('fails rendering', () => {
            const mockJumpTp = jest.fn();
            const mockCurrentUserId = '28';
            const mockContents = projects;
            const filter = ''
            const wrapper = shallow(
                <Paginator
                    filter={filter}
                    isFetching={true}
                    perPage={1}
                    currentPage={1}
                    jumpTo={mockJumpTp}
                    currentUserId={mockCurrentUserId}
                    contents={mockContents}
                >
                    <ProjectCard
                        currentUserId={mockCurrentUserId}
                    />
                </Paginator>
            );
            expect(toJson(wrapper)).toMatchSnapshot();

            const wrapper2 = shallow(
                <Paginator
                    filter={filter}
                    isFetching={false}
                    perPage={1}
                    currentPage={1}
                    jumpTo={mockJumpTp}
                    currentUserId={mockCurrentUserId}
                    contents={mockContents}
                >
                    <ProjectCard
                        currentUserId={mockCurrentUserId}
                    />
                </Paginator>
            );
            expect(toJson(wrapper2)).toMatchSnapshot();
        });
    });
});

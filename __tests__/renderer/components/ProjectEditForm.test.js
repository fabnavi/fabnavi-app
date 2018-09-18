import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import configureStore from 'redux-mock-store'; // Smart components


import { ProjectEditForm, mapStateToProps, mapDispatchToProps } from '../../../src/renderer/components/ProjectEditForm';
import { updateProject } from '../../../src/renderer/actions/manager';

describe('<ProjectEditForm />', () => {
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

        it('renders the component', () => {
            const wrapper = shallow(
                <ProjectEditForm
                    project={project}
                    updateProject={jest.fn()}
                />
            );
            expect(toJson(wrapper)).toMatchSnapshot();
            wrapper.find('.form-box-edit').simulate('submit', {
                preventDefault() {},
                stopPropagation() {}
            })
            wrapper.find('.form-nameedit').simulate('change', {
                target: {
                    value: 'a'
                }
            })
            wrapper.find('.form-descriptionedit').simulate('change', {
                target: {
                    value: 'a'
                }
            })

            wrapper.find('.form-privateedit').simulate('change', {
                target: {
                    checked: true
                }
            })

        });


    });

    it('mapStateToProps works', () => {
        const initialState = {
            manager: {
                targetProject: {}
            }
        };
        expect(mapStateToProps(initialState)).toEqual({ project: {} });
    });

    it('mapDispatchToProps works', () => {
        const project = {};
        const dispatch = jest.fn();
        mapDispatchToProps(dispatch).updateProject(project);
        expect(dispatch.mock.calls[0][0]).toEqual(updateProject(project));
    })
});

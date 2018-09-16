import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';

import HelpPage from '../../../src/renderer/components/HelpPage';

describe('<HelpPage />', () => {
    describe('render()', () => {
        test('renders the component', () => {
            const wrapper = render(<HelpPage />);
            expect(toJson(wrapper)).toMatchSnapshot();
        });
    });
});

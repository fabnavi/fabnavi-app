import { injectGlobal } from 'styled-components';
import NotoSansR from '../fonts/NotoSans-Regular.ttf';
import NotoSansB from '../fonts/NotoSans-Bold.ttf';
import ArialRoundedMTBoldBold from '../fonts/ArialRoundedMTBoldBold.ttf';

injectGlobal`
    @font-face {
        font-family : "ArialRoundedMTBoldBold";
        src: url(${ArialRoundedMTBoldBold});
    }
    @font-face {
        font-family : "NotoSans-Bold";
        src: url(${NotoSansB});
    }
    @font-face {
        font-family : "NotoSans-Regular";
        src: url(${NotoSansR});
    }
    body {
        font-family: Helvetica, Arial, '游ゴシック', 'Yu Gothic', '游ゴシック体', YuGothic, sans-serif;
        margin: 0;
    }
    li {
        list-style: none;
    }
`;

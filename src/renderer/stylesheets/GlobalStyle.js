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
    @font-face {
        font-family: "YuGothic-Medium";
        src: url("Yu Gothic Medium")
    }
    @font-face {
        font-family: "YuGothic-Bold";
        src: url("Yu Gothic Bold")
    }
    body {
        font-family: NotoSans-Regular;
        margin: 0;
    }
    li {
        list-style: none;
    }
`;

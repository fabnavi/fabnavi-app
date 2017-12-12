import *as types from '../src/actions/manager';

import reducer, { initialState } from '../src/reducers/manager';

describe('fabnavi::reducer::manager', () => {
    it('should handle RECEIVED_TEST_ACTION reducer', () => {
        expect(
            reducer(
                initialState,
                types.receivedTestAction({
                    hoge: 1,
                    fuga: 2
                })
            )
        ).toEqual(
            Object.assign({}, initialState, {
                ...initialState,
                hoge: 1,
                fuga: 2
            })
        )
    })
})

import {fromJS, is} from 'immutable'
import * as util from 'app/store/util'
import {expect} from 'chai'

describe('app/store/util', () => {
    describe('pickState()', () => {
        const mockState = () => fromJS({auth: {token: null}, someStuff: 153})
        const mockTree = () => [["auth", ["token"]]]
        const mockIdeal = () => ({auth: {token: null}})

        it('works', () => {
            const state = mockState()
            const tree = mockTree()
            const expected = util.pickState(tree)(state)
            expect(expected).to.deep.equal(mockIdeal())
        })
    })
})


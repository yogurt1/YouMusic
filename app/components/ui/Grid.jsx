import styled, {css, injectGlobal} from 'styled-components'
import {createElement} from 'react'

const sizes = {
    1: 4.66666666667,
    2: 13.3333333333,
    3: 22,
    4: 30.6666666667,
    5: 39.3333333333,
    6: 48,
    7: 56.6666666667,
    8: 65.3333333333,
    9: 74.0,
    10: 82.6666666667,
    11: 91.3333333333,
    12: 100,
    [1/3]: 30.6666666667,
    [2/3]: 65.3333333333,
    [1/2]: 48
}

const offsets = {
    1: 8.66666666667,
    2: 17.3333333333,
    3: 26,
    4: 34.6666666667,
    5: 43.3333333333,
    6: 52,
    7: 60.6666666667,
    8: 69.3333333333,
    9: 78.0,
    10: 86.6666666667,
    11: 95.33333333333,
    [1/3]: 34.6666666667,
    [2/3]: 69.33333333333,
    [1/2]: 52
}

const breakpoints = new function() {
    const labels = {
        mobile: 400,
        phablet: 550,
        tablet: 750,
        desktop: 100,
        desktophd: 1200
    }
    for (const label in labels) {
        this[label] = `min-width: ${labels[label] + 'px'}`
    }
    // this.get = label => labels[label] + 'px'
    return this
}

const fullWidth = `
    width: 100%;
    box-sizing: border-box;
`
const pullRight = `float:right;`
const pullLeft = `float:left;`
const clearfix = `
    &:after {
        content: "";
        display: table;
        clear: both;
    }
`

export const Container = styled.div`
    position: relative;
    width: 100%;
    max-width: ${p => p.wide ? '99%' : '960px'};
    margin: 0 auto;
    padding: 0 20px;
    box-sizing: border-box;

    @media (${breakpoints.mobile}) {
        width: 85%;
        padding: 0;
    }

    @media (${breakpoints.phablet}) {
        width: 80%;
    }

    ${clearfix}
`

export const Clearfix = styled.div`${clearfix}`
export const Row = ({size, children}) => createElement(Clearfix, null,
    children.map((child, key) => createElement(Column, {
        key,
        size: size || 12 / children.length
    }, child)))

export const Column = styled.div`
    width: 100%;
    float: left;
    box-sizing: border-box;

    @media (${breakpoints.phablet}) {
        margin-left: ${p => p.size === 12 ? 0 : '4%'};
        width: ${p => sizes[p.size]}%;

        &:first-child {
            margin-left: 0;
        }
    }

    ${p => p.clearfix ? clearfix : ''}
`
export const Col = Column // shorthand

export const Flex = styled.div`
    display: flex;
    flex-direction: ${p => p.vertical ? 'column' : 'row'};
`

export const OffestBy = styled.div`
    margin-left: ${p => offsets[p.offset]}%;
`

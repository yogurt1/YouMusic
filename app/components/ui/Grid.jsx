import React, {createElement} from "react"
import styled, {css, injectGlobal} from "styled-components"

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
    12: 100
}

const breakpoints = {
    mobile: 400,
    phablet: 550,
    tablet: 750,
    desktop: 100,
    desktophd: 1200
}

const clearfix = `
    &:after {
        content: "";
        display: table;
        clear: both;
    }
`
export const Container = styled.div`
    max-width: ${p => p.wide ? "99%" : "960px"};
    position: relative;
    width: 100%;
    margin: 0 auto;
    padding: 0 20px;
    box-sizing: border-box;

    @media (min-width: 400px) {
        width: 85%;
        padding: 0;
    }

    @media (min-width: 550px) {
        width: 80%;
    }

    ${clearfix}
`
export const fullWidth = "width:100%;max-width:100%;"
export const ContainerWide = styled(Container)`
    ${fullWidth}
    @media (min-width: 400px) { ${fullWidth} }
    @media (min-width: 550px) { ${fullWidth} }
`

export const Column = styled.div`
    width: 100%;
    float: ${p => p.right ? "right" : "left"};
    box-sizing: border-box;

    @media (min-width: 550px) {
        margin-left: ${p => p.size === 12 ? 0 : "4%"};
        width: ${p => sizes[p.size]}%;

        &:first-child {
            margin-left: 0;
        }
    }
`

export const Clearfix = styled.div`${clearfix}`
export const Row = ({children}) => createElement(Clearfix, {
    children: children.find(child =>
            (child.type === Column && child.props.size))
        ? children
        : children.map((child, key) => createElement(Column, {
            key,
            children: child,
            size: 12 / children.length
        }))
})

export const Col = Column
export const Flex = styled.div`
    display: flex;
    flex-direction: ${p => p.vertical ? "column" : "row"};
`

export const getColumnBySize = size => props => <Column size={size} {...props} />

// Column.name = "Column"
// Clearfix.name = "Clearfix"
// Row.name = "Row"
// Container.name = "Container"

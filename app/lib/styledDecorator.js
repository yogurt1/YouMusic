import React from 'react'
import styled from 'styled-components'

export default function styledDecorator(styles, tag = 'div') {
    const Styled = styled(tag)`${styles}`
    return Component => {
        return (props) => (
            <Styled>
                <Component {...props} />
            </Styled>
        )
    }
}

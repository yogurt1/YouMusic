import React from 'react'
import {Container, Columns} from './Grid'

export default class Layout extends React.PureComponent {
    render() {
        return (
            <div>
                <Container wide>
                    <h1>Layout</h1>
                    <hr />
                </Container>
                {this.props.children}
            </div>
        )
    }
}

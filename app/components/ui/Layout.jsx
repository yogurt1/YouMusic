import React from 'react'
import {Container, Row, Column} from './Grid'

export default class Layout extends React.PureComponent {
    render() {
        return (
            <div>
                <Container wide>
                    <Row>
                        <Column>
                            <h1>youmusic</h1>
                        </Column>
                        <Column>
                            <span>simple youtube player</span>
                        </Column>
                    </Row>
                    <hr />
                </Container>
                {this.props.children}
            </div>
        )
    }
}

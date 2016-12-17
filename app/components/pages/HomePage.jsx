import React from "react"
import styled from "styled-components"
import {Link} from "react-router"
import {Button} from "semantic-ui-react"
import {Row, Column, Container, Section} from "app/components/ui/Grid"

export default class HomePage extends React.Component {
    render() {
        return (
            <div>
                <Button as={Link} to="/test">
                    About
                </Button>
            </div>
        )
    }
}

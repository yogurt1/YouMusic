import * as React from "react"

export interface Props {}
export interface State {
    open?: boolean
}

const MenuWrap: React.StatelessComponent<{
    hidden?: boolean
}> = ({hidden, children}) => (
    <div style={{display: hidden ? "none": "block"}}>
        {children}
    </div>
)

export default class TestPage extends React.PureComponent<Props, State>{
    state = {
        open: false
    }

    private handleClick = () => this.setState({open: true})

    render() {
        return (
            <div id="outer-container">
                <main id="page-wrap">
                    <h1>Page</h1>
                    <button onClick={this.handleClick}>Open sidebar</button>
                </main>
            </div>
        )
    }
}

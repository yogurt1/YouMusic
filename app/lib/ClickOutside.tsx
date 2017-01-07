import * as React from "react"
import {isBrowser} from "./util"

export interface Props {
    onClickOutside: React.MouseEventHandler<React.MouseEvent<HTMLElement>>
}

export default class ClickOutside extends React.Component<Props, null> {
    private containerRef: HTMLElement

    private handleClick = ev => {
        if (!this.containerRef.contains(ev.target)) {
            this.props.onClickOutside(ev)
        }
    }

    componentDidMount() {
        if (isBrowser) {
            document.addEventListener("click", this.handleClick, true)
        }
    }

    componentWillUnmount() {
        if (isBrowser) {
            document.removeEventListener("click", this.handleClick, true)
        }
    }

    render() {
        const {children, onClickOutside, ...props} = this.props
        return (
            <div {...props} ref={ref => this.containerRef = ref}>
                {children}
            </div>
        )
    }
}

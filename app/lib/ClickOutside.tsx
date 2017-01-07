import * as React from "react"
import {isBrowser} from "./util"

export interface Props {
    inside?: HTMLElement
    onClickOutside: React.MouseEventHandler<React.MouseEvent<HTMLElement>>
}

export default class ClickOutside extends React.Component<Props, null> {
    private containerRef: HTMLElement

    private handleClick = ev => {
        const {onClickOutside} = this.props
        const {containerRef} = this

        // if (this.props.inside) {
        //     if (ev.target.contains(containerRef)) {
        //         onClickOutside(ev)
        //     }
        // }

        if (!containerRef.contains(ev.target)) {
            onClickOutside(ev)
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
            <span {...props} ref={ref => this.containerRef = ref}>
                {children}
            </span>
        )
    }
}

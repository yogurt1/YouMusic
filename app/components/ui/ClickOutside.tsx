import * as React from "react"
import document from "global/document"
import platform from "app/lib/platform"

export interface Props {
    inside?: HTMLElement
    onClickOutside: (ev: Event) => void
}

export default class ClickOutside extends React.Component<Props, null> {
    private containerRef: HTMLElement
    private setContainerRef = (ref: HTMLElement) => {
        this.containerRef = ref
    }

    private handleClick = (ev: Event) => (
        this.containerRef.contains(ev.target as Node) ||
        this.props.onClickOutside(ev)
    )

    componentDidMount() {
        if (platform.isBrowser) {
            document.addEventListener("click", this.handleClick, true)
        }
    }

    componentWillUnmount() {
        if (platform.isBrowser) {
            document.removeEventListener("click", this.handleClick, true)
        }
    }

    render() {
        const { children, onClickOutside, ...props } = this.props
        return (
            <span {...props} ref={this.setContainerRef}>
                {children}
            </span>
        )
    }
}

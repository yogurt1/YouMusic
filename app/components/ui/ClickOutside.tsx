import * as React from 'react'
import document from 'global/document'
import platform from 'app/lib/platform'

type Props = {
  inside?: HTMLElement
  onClickOutside: (ev: Event) => void
}

export default class ClickOutside extends React.Component<Props, null> {
  private containerRef: HTMLElement

  private setContainerRef = (ref: HTMLElement) => {
    this.containerRef = ref
  }

  private handleClick = (ev: Event) => {
    if (!this.containerRef.contains(ev.target as Node)) {
      this.props.onClickOutside(ev)
    }
  }

  componentDidMount() {
    if (platform.isBrowser) {
      document.addEventListener('click', this.handleClick, true)
    }
  }

  componentWillUnmount() {
    if (platform.isBrowser) {
      document.removeEventListener('click', this.handleClick, true)
    }
  }

  render() {
    const { children } = this.props
    return (
      <div ref={this.setContainerRef}>
        {children}
      </div>
    )
  }
}

import * as React from "react"

interface MyWindow extends Window {
    __APOLLO_CLIENT__: string,
    __PRELOADED_STATE__: string
}

interface Process {
    browser?: boolean
    env: {
        [key: string]: string
    }
}

declare module "react" {
    export type StyledComponent = React.StatelessComponent<any>
}

declare var module: any
declare var window: MyWindow
declare var process: Process
declare var DEV: string

import * as React from "react"

interface Process {}

interface MyWindow extends Window {
    __APOLLO_CLIENT__: string,
    __PRELOADED_STATE__: any
    __APOLLO_STATE__: any
}

// interface MyGlobal extends Global {
//     DEV: string
//     __DEV__: string
// }

interface MyProcess extends Process {
    browser?: boolean
    env: {
        [key: string]: string
    }
}

declare module "react" {
    export type StyledComponent = React.StatelessComponent<any>
}

declare var module: any
declare var System: any
declare var global: MyWindow | any
declare var window: MyWindow | any
declare var process: MyProcess | any
declare var DEV: string

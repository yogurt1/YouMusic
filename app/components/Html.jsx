import React from 'react'

export default function Html({state, styles, children}) {
    const script = !state ? null : `
        window.__PRELOADED__STATE = ${JSON.stringify(state)}
        window.__APOLLO_STATE__ = ${JSON.stringify(state.get('apollo'))}
    `
    return (
        <html>
            <head>
                <title>Rendered on server</title>
                <style dangerouslySetInnerHTML={{__html: styles}} />
            </head>
            <body>
                <div id="app">
                    {children}
                </div>
                <script dangerouslySetInnerHTML={{__html: script}} />
                <script src="/app.bundle.js" />
            </body>
        </html>
    )
}

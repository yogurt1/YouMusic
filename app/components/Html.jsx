import React from 'react'
const vendorScripts = [
    "//cdn.tinymce.com/4/tinymce.min.js",
    "https://www.youtube.com/iframe_api"
].map((src, i) => (
    <script defer src={src} key={i} />
))

export default function Html({state, styles, children}) {
    const script = !state ? null : `
        window.__PRELOADED__STATE = ${JSON.stringify(state)}
        window.__APOLLO_STATE__ = ${JSON.stringify(state.get('apollo'))}
    `
    return (
        <html>
            <head>
                <title>YouMusic</title>
                <style dangerouslySetInnerHTML={{__html: styles}} />
            </head>
            <body>
                <div id="app">
                    {children}
                </div>
                {vendorScripts}
                <script dangerouslySetInnerHTML={{__html: script}} />
                <script defer src="/app.bundle.js" />
            </body>
        </html>
    )
}

import React from 'react'
// import Helmet from 'react-helmet'

const vendorScripts = [
    "//cdn.tinymce.com/4/tinymce.min.js"
    // "https://www.youtube.com/iframe_api"
]

const vendorStyles = [
    "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css",
    "//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"
]

export default function Html({state, styles, children}) {
    const script = !state ? null : `
        window.__PRELOADED__STATE = ${JSON.stringify(state)}
        window.__APOLLO_STATE__ = ${JSON.stringify(state.get('apollo'))}
    `
    return (
        <html>
            <head>
                <title>YouMusic</title>
                <meta charSet="utf-8" />
                {vendorStyles.map((href, i) => (
                    <link rel="stylesheet" href={href} key={i} />
                ))}
                <style dangerouslySetInnerHTML={{__html: styles}} />
            </head>
            <body>
                <div id="app">
                    {children}
                </div>
                {vendorScripts.map((src, i) => (
                    <script defer src={src} key={i} />
                ))}
                <script dangerouslySetInnerHTML={{__html: script}} />
                <script defer src="/app.bundle.js" />
            </body>
        </html>
    )
}

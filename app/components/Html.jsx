import React from "react"
import Helmet from "react-helmet"
import baseStyles from "app/lib/baseStyles"
// import assets from "../../assets.json"

const assets = {
    js: "/app.bundle.js",
    css: "/styles.bundle.css",
}

export default function Html({locale, state, styles, children}) {
    const head = Helmet.rewind()
    const attrs = head.htmlAttributes.toComponent()
    const script = `window.__PRELOADED__STATE__ = ${JSON.stringify(state)}`

    return (
        <html {...attrs}>
            <head>
                <title>YouMusic</title>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link
                    rel="stylesheet"
                    href={assets.css} />
                <style
                    dangerouslySetInnerHTML={{__html: baseStyles}}
                />
                <style
                    className="__CRITICAL_CSS__"
                    dangerouslySetInnerHTML={{__html: styles}}
                />
                {head.title.toComponent()}
                {head.meta.toComponent()}
                {head.link.toComponent()}
            </head>
            <body>
                <div id="app">
                    {children}
                </div>
                <script dangerouslySetInnerHTML={{__html: script}} />
                <script src={assets.js} />
            </body>
        </html>
    )
}

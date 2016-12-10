import React from 'react'
// import Helmet from 'react-helmet'
import baseStyles from 'app/lib/baseStyles'

const assets = {
    js: ["/app.bundle.js"],
    css: ["/styles.bundle.css"],
}

export default function Html({state, styles, children}) {
    const script = 'window.__PRELOADED_STATE__ = '
        + state ? JSON.stringify(state) : void 0

    return (
        <html>
            <head>
                <title>YouMusic</title>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <style
                    type="text/css"
                    dangerouslySetInnerHTML={{__html: baseStyles}}
                />
                {assets.css.map((href, i) => (
                    <link rel="stylesheet" href={href} key={i} />
                ))}
                <style
                    className="__CRITICAL_CSS__"
                    type="text/css"
                    dangerouslySetInnerHTML={{__html: styles}}
                />
            </head>
            <body>
                <div
                    id="app"
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute"
                    }}>
                    {children}
                </div>
                <script dangerouslySetInnerHTML={{__html: script}} />
                {assets.js.map((src, i) => (
                    <script defer src={src} key={i} />
                ))}
            </body>
        </html>
    )
}

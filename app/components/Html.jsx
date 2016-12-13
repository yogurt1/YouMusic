import React from 'react'
import Helmet from 'react-helmet'
import baseStyles, {normalize} from 'app/lib/baseStyles'

const assets = {
    js: ["/app.bundle.js"],
    css: ["/styles.bundle.css"],
}

export default function Html({locale, state, styles, children}) {
    Helmet.rewind()
    const script = `window.__PRELOADED__STATE__ = ${state ? JSON.stringify(state) : void 0}`

    return (
        <html>
            <head>
                <title>YouMusic</title>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                {/*<style
                    type="text/css"
                    dangerouslySetInnerHTML={{__html: normalize}}
                />*/}
                {assets.css.map((href, i) => (
                    <link rel="stylesheet" href={href} key={i} />
                ))}
                <style
                    type="text/css"
                    dangerouslySetInnerHTML={{__html: baseStyles}}
                />
                <style
                    className="__CRITICAL_CSS__"
                    type="text/css"
                    dangerouslySetInnerHTML={{__html: styles}}
                />
            </head>
            <body>
                <div id="app">
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

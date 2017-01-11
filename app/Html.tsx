import * as React from "react"
import * as Helmet from "react-helmet"
import styled, {keyframes} from "styled-components"
import {Record} from "immutable"
import {flatten} from "lodash"
import baseStyles from "app/lib/baseStyles"
import {State} from "app/store"

const assets = {
    css: "/assets/styles.bundle.css",
    js: "/assets/app.bundle.js"
}

const spin = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(359deg); }
`

const Loader = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    width: 100%;
    z-index: 9999;
    background-color: rgba(10,10,10,.8);

    & > span {
        position: absolute;
        display: block;
        margin: auto auto;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 60px;
        height: 60px;
        animation: ${spin} .6s infinite linear;
        border-left: 6px solid rgba(0, 174, 239, .15);
        border-right: 6px solid rgba(0, 174, 239, .15);
        border-bottom: 6px solid rgba(0, 174, 239, .15);
        border-top: 6px solid rgba(0, 174, 239, .8);
        border-radius: 100%;
        transition: all .2s ease-out;
    }

`

export interface HtmlProps {
    state?: State,
    locale?: string,
    styles?: string,
    children?: React.ReactElement<any>
}

export default function Html({locale, state, styles, children}: HtmlProps) {
    const head = Helmet.rewind()
    const attrs = head.htmlAttributes.toComponent()
    const serializedState = JSON.stringify(state)
    const script = `
        window.__PRELOADED__STATE__ = ${serializedState};
        document.getElementById("__BUNDLE_CSS__").rel = "stylesheet";
    `

    // <link as="style"... />
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
                    id="__BUNDLE_CSS__"
                    rel="preload"
                    as="style"
                    href={assets.css}
                    />
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
                <div id="__LOADER__">
                    <Loader>
                        <span />
                    </Loader>
                </div>

                <noscript>
                    <a href="" style={{
                        display: "block",
                        position: "absolute",
                        color: "white",
                        textDecoration: "none",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0,0,0,.75)",
                        overflow: "hidden",
                        zIndex: 9999
                    }}>
                        <div style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            overflow: "hidden"
                        }}>
                            <h1 style={{
                                textAlign: "center"
                            }}>
                                Enable JavaScript
                                <br />
                                (click to reload)
                            </h1>
                        </div>
                    </a>
                    <style dangerouslySetInnerHTML={{__html: `
                        #__LOADER__ { display:none; }
                    `}} />
                </noscript>

                <div id="app">
                    {children}
                </div>
                <script dangerouslySetInnerHTML={{__html: script}} />
                <script src={assets.js} />
            </body>
        </html>
    )
}
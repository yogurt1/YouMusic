import * as React from "react"
import * as Helmet from "react-helmet"
import styled, { injectGlobal, keyframes } from "styled-components"
import * as transit from "transit-immutable-js"
import { flatten } from "lodash"
import { State } from "app/store"
import {
    INITIAL_STATE_KEY,
    LOADER_SELECTOR,
    CRITICAL_CSS_SELECTOR,
    TARGET_SELECTOR
} from "app/lib/constants"

injectGlobal`
    .__LOADER__ {
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
            animation: ${keyframes`
                from { transform: rotate(0deg); }
                to { transform: rotate(359deg); }
            `} .9s infinite linear;
            border-left: 6px solid rgba(0, 174, 239, .15);
            border-right: 6px solid rgba(0, 174, 239, .15);
            border-bottom: 6px solid rgba(0, 174, 239, .15);
            border-top: 6px solid rgba(0, 174, 239, .8);
            border-radius: 100%;
        }
    }
`

const baseStyles = `
    body {
        font-size: 1.5em;
        line-height: 1.6;
        font-weight: 300;
        font-family: Roboto, HelveticaNeue, "Helvetica Neue", Helvetica, Arial, sans-serif;
        color: #222;
    }

    #__NOSCRIPT__ > a {
        display: block;
        position: absolute;
        color: "white";
        text-decoration: "none";
        top: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .75);
        overflow: hidden;
        z-index: 9999;
    }

    #__NOSCRIPT__ > a > div {
        position: absolute;
        top: 50%;
        left: 50%;
        overflow: hidden;
    }

    #__NOSCRIPT__ > a > div > h1 {
        text-align: center;
    }
`

const ASSET_PREFIX = ""
const assets = {
    app: {
        js: `${ASSET_PREFIX}/app.bundle.js`
    },
    vendor: {
        js: `${ASSET_PREFIX}/vendor.dll.js`,
        css: `${ASSET_PREFIX}/vendor.dll.css`
    }
}

type HtmlProps = {
    state?: State,
    locale?: string,
    styles?: string,
}

const Html: React.StatelessComponent<HtmlProps> = ({
    locale,
    state,
    styles,
    children
}) => {
    const head = Helmet.rewind()
    const attrs = head.htmlAttributes.toComponent()
    const serializedState = JSON.stringify(transit.toJSON(state))
    const script = `
        window.${INITIAL_STATE_KEY} = ${serializedState};
        document.getElementById("__PRELOAD_CSS__").rel = "stylesheet";
    `

    return (
        <html {...attrs}>
            <head>
                <Helmet
                    defaultTitle="YouMusic"
                    titleTemplate="%s - YouMusic"
                />
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link
                    id="__PRELOAD_CSS__"
                    rel="preload"
                    href={assets.vendor.css}
                />
                <style
                    dangerouslySetInnerHTML={{__html: baseStyles}}
                />
                <style
                    id={CRITICAL_CSS_SELECTOR}
                    dangerouslySetInnerHTML={{__html: styles}}
                />

                {head.title.toComponent()}
                {head.meta.toComponent()}
                {head.link.toComponent()}
            </head>
            <body>
                <div id={LOADER_SELECTOR}>
                    <span />
                </div>

                <noscript id="__NOSCRIPT__">
                    <a href="">
                        <div>
                            <h1>
                                Enable JavaScript
                                <br />
                                (click to reload)
                            </h1>
                        </div>
                    </a>
                    <style dangerouslySetInnerHTML={{__html: `
                        .__LOADER__ { display:none; }
                    `}} />
                </noscript>

                <div id={TARGET_SELECTOR}>
                    {children}
                </div>
                <script dangerouslySetInnerHTML={{ __html: script }} />
                <script defer src={assets.vendor.js} />
                <script defer src={assets.app.js} />
            </body>
        </html>
    )
}

export default Html

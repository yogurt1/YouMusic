import * as R from 'ramda'
import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import styled, { injectGlobal, keyframes } from 'styled-components'
import * as Helmet from 'react-helmet'
import * as transit from 'transit-immutable-js'
import { flatten } from 'lodash'
import { State } from 'app/store'
import {
    INITIAL_STATE_KEY,
    LOADER_SELECTOR,
    CRITICAL_CSS_SELECTOR,
    TARGET_SELECTOR,
    NOSCRIPT_SELECTOR
} from 'app/lib/constants'

const getJs = R.prop('js')
const getCss = R.prop('css')

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
        font-family: Roboto, HelveticaNeue, 'Helvetica Neue', Helvetica, Arial, sans-serif;
        color: #222;
    }
`

type Asset = {
    js?: string,
    css?: string
}

type Assets = {
    app?: Asset,
    vendor?: Asset
}

type HtmlProps = {
    state?: State,
    assets?: Assets,
    locale?: string,
    styles?: string
}

const ASSET_PREFIX = ''
const defaultAssets = {
    app: {
        js: `${ASSET_PREFIX}/app.bundle.js`
    },
    vendor: {
        js: `${ASSET_PREFIX}/vendor.dll.js`,
        css: `${ASSET_PREFIX}/vendor.dll.css`
    }
}

const noScript = `
    <noscript id='${NOSCRIPT_SELECTOR}'>
        <style>
            .${LOADER_SELECTOR} { display: none; }

            #${NOSCRIPT_SELECTOR} > a {
                display: block;
                position: absolute;
                color: 'white';
                text-decoration: 'none';
                top: 0;
                bottom: 0;
                right: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, .75);
                overflow: hidden;
                z-index: 9999;
                display: block
            }

            #${NOSCRIPT_SELECTOR} > a > div {
                position: absolute;
                top: 50%;
                left: 50%;
                overflow: hidden;
            }

           #${NOSCRIPT_SELECTOR} > a > div > h1 { text-align: center; }
        </style>
        <a href=''>
            <div>
                <h1>Enable JavaScript<br>(click to reload)</h1>
            </div>
        </a>
    </noscript>
`

const serializeState = R.pipe(
    transit.toJSON,
    JSON.stringify
)

const pickAssetFromAssets = (assets: Assets) => R.pipe(
    R.unapply(R.identity),
    R.pathOr('', (R as any).__, assets) as any

) as (...strs: string[]) => string


const Html: React.StatelessComponent<HtmlProps> = ({
    locale,
    state,
    styles,
    assets = defaultAssets,
    children
}) => {
    const helmet = Helmet.rewind();
    const htmlAttrs = helmet.htmlAttributes.toComponent()
    const bodyAttrs = helmet.bodyAttributes.toComponent()
    const script = `
        window.${INITIAL_STATE_KEY} = ${serializeState(state)};
        document.getElementById('__PRELOAD_CSS__').rel = 'stylesheet';
    `
    const pickAsset = pickAssetFromAssets(assets)
    return (
        <html {...htmlAttrs}>
            <head>
                <Helmet
                    defaultTitle='YouMusic'
                    titleTemplate='%s - YouMusic'
                />
                <title>{helmet.title.toComponent()}</title>
                {helmet.meta.toComponent()}
                {helmet.link.toComponent()}

                <meta charSet='utf-8' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <link
                    id='__PRELOAD_CSS__'
                    rel='preload'
                    href={pickAsset('vendor', 'css')}
                />
                <style
                    dangerouslySetInnerHTML={{__html: baseStyles}}
                />
                <style
                    id={CRITICAL_CSS_SELECTOR}
                    dangerouslySetInnerHTML={{__html: styles}}
                />
            </head>
            <body {...bodyAttrs}>
                <div id={LOADER_SELECTOR}>
                    <span />
                </div>
                {noScript}
                <div id={TARGET_SELECTOR}>
                    {children}
                </div>
                <script dangerouslySetInnerHTML={{ __html: script }} />
                <script defer src={pickAsset('vendor', 'js')} />
                <script defer src={pickAsset('app', 'js')} />
            </body>
        </html>
    )
}

export default Html

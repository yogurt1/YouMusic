import * as R from 'ramda'
import * as React from 'react'
import * as Helmet from 'react-helmet'
import * as transit from 'transit-immutable-js'
import Loader from 'app/components/Loader'
import {
  CRITICAL_CSS_SELECTOR,
  INITIAL_STATE_KEY,
  LOADER_SELECTOR,
  TARGET_SELECTOR
} from 'app/lib/constants'
import { State } from 'app/store'
import * as assetUtils from './assetUtils'
import globalStyles from './globalStyles'
import noScript from './noScript'

type HtmlProps = {
  state?: State,
  assets?: assetUtils.Assets,
  locale?: string,
  styles?: string
}

const serializeState = R.pipe(
  transit.toJSON,
  JSON.stringify
)

const PRELOAD_CSS_SELECTOR = '__PRELOAD_CSS__'
const GLOBAL_CSS_SELECTOR = '__GLOBAL_CSS__'

const Html: React.StatelessComponent<HtmlProps> = ({
  state,
  styles,
  assets = assetUtils.defaultAssets,
  children
}) => {
  const helmet = Helmet.rewind()
  const htmlAttrs = helmet.htmlAttributes.toComponent()
  const bodyAttrs = helmet.bodyAttributes.toComponent()

  const script = `
    window['${INITIAL_STATE_KEY}'] = ${serializeState(state)};
    document.getElementById('${PRELOAD_CSS_SELECTOR}').rel = 'stylesheet';
  `
  const pickAsset = assetUtils.pickAssetFromAssets(assets)
  return (
    <html {...htmlAttrs}>
      <head>
        <title>{helmet.title.toComponent()}</title>
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        <meta charSet='utf-8' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1'
        />
        <link
          id={PRELOAD_CSS_SELECTOR}
          rel='preload'
          href={pickAsset('vendor', 'css')}
        />
        <style
          id={GLOBAL_CSS_SELECTOR}
          dangerouslySetInnerHTML={{__html: globalStyles}}
        />
        <style
          id={CRITICAL_CSS_SELECTOR}
          dangerouslySetInnerHTML={{__html: styles}}
        />
      </head>
      <body {...bodyAttrs}>
        <Loader id={LOADER_SELECTOR} />
        {noScript}
        <div id={TARGET_SELECTOR}>{children}</div>
        <script dangerouslySetInnerHTML={{ __html: script }} />
        <script defer src={pickAsset('vendor', 'js')} />
        <script defer src={pickAsset('app', 'js')} />
      </body>
    </html>
  )
}

export default Html

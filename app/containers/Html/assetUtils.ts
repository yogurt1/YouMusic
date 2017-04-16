import * as R from 'ramda'

export type Asset = {
    js?: string,
    css?: string
}

export type Assets = {
    app?: Asset,
    vendor?: Asset
}

const ASSET_PREFIX = ''
export const defaultAssets = {
  app: {
    js: `${ASSET_PREFIX}/app.bundle.js`
  },
  vendor: {
    css: `${ASSET_PREFIX}/vendor.dll.css`,
    js: `${ASSET_PREFIX}/vendor.dll.js`
  }
}

export const pickAssetFromAssets = (assets: Assets) => R.pipe(
  R.unapply(R.identity),
  R.pathOr('', (R as any).__, assets) as any
) as (...strs: string[]) => string

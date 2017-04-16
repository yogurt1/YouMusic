import { persistStore } from 'redux-persist-immutable'
import * as Redux from 'redux'
import { Record } from 'immutable'
import * as LocalForage from 'localforage'

type Opts = {
  store: Redux.Store<any>,
  storage: Storage | LocalForage,
  key: string,
  blacklist?: string[],
  records?: Array<Record<any, any>>
}

type Persistor = {
  rehydrate(state: any, opts?: { serial?: boolean }): void,
  purge(): void,
  pause(): void,
  resume(): void
}

const persistStoreAsync = ({ store, ...opts }: Opts): Promise<Persistor> =>
  new Promise(
    (resolve, reject) => {
      let persistor: any
      const callback = () => {
        resolve(persistor)
      }

      persistor = persistStore(store, opts, callback)
    }
  )

export default persistStoreAsync

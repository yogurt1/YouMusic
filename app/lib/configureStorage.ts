import * as localForage from "localforage"

export default (storageDriver) => {
    const storage = localForage.createInstance({
        driver: storageDriver,
        name: "reduxState",
        description: "persisted redux state"
    })

    return storage
}

import { History, Location } from "history"
import { addLeadingSlash, createPath, parsePath } from "history/PathUtils"
const noop = () => {}

const normalizeLocation = ({
    pathname = '/',
        search = '',
        hash = ''
}: Location) => ({
    pathname,
    search: search !== "?" ? search : "",
    hash: hash !== "#" ? hash : "",
})

const stripBasename = (basename: string, location: Location) => {
    if (!basename) {
        return location
    }

    const base = addLeadingSlash(basename)

    if (location.pathname.indexOf(base) !== 0) {
        return location
    }

    return {
        ...location,
        pathname: location.pathname.substr(base.length)
    }
}


const addBasename = (basename: string, location: Location) => (
    !basename
        ? location
        : ({
            ...location,
            pathname: addLeadingSlash(basename) + location.pathname
        })
)

const createLocation = (location: string | Location) => (
    typeof location === "string"
        ? parsePath(location)
        : normalizeLocation(location)
)

const createURL = (location: string | Location) =>
    typeof location === "string"
        ? location
        : createPath(location)

const createHref = (basename: string) => (path: string) =>
    addLeadingSlash(basename + createURL(path))

export type Context = {
    action?: string,
    location?: Location
    url?: string,
}

export default ({ basename, location, context }: {
    basename?: string,
    context: Context
    location: Location,
}): History => {
    const handleAction = (action: string) => (location: string | Location) => {
        context.action = action
        context.location = addBasename(basename, createLocation(location))
        context.url = createURL(context.location)
    }
    const staticHandler = action => {}

    const history = {
        staticContext: context,
        createHref,
        action: "POP",
        location: stripBasename(
            basename,
            createLocation(location)
        ),
        push: handleAction("PUSH"),
        replace: handleAction("REPLACE"),
        go: staticHandler("go"),
        goBack: staticHandler("goBack"),
        goForward: staticHandler("goForward"),
        listen: noop,
        block: noop,
    }

    return history
}

import { Map } from 'immutable'

type Opts = {
    markup: string,
    styles: string,
    state: Map<string, any>
}

export default ({
    markup,
    styles,
    state
}: Opts) => {
    return `
        <!doctype html>
        <html>
        </html>
    `
}

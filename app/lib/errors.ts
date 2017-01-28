export const types = {

}

export const ConditionalError = function(err) {
    const { type = err.message } = err

    switch(type) {
    default: throw err
    }
}

export class RequestError extends Error {
    constructor(
        public status: number,
        statusText: string
    ) {
        super(statusText)
        Error.captureStackTrace(this)
    }
}

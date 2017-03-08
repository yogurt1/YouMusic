import * as global from 'global'
const hasWorker = Boolean(
    global.window &&
    global.URL &&
    global.Blob &&
    global.Worker
)

class InlineWorker implements Worker {
    private handleMessage: (event: Event) => void

    constructor(
        private func: Function,
        private self: any = {}
    ) {
        this.self.postMessage = (data) => {
            if (!this.handleMessage) {
                process.nextTick(() => {
                    this.handleMessage(data)
                })
            }
        }
    }

    postMessage(data) {
    }

    set onmessage(handleMessage) {
        this.handleMessage = handleMessage
    }
}

export default (func: Function): Worker | any => {
    return global.process
        ? new InlineWorker(func)
        : new Worker(
            URL.createObjectURL(
                new Blob(
                    [`(${func.toString})(self)`],
                    { type: "text/javascript" }
                )
            )
        )
}

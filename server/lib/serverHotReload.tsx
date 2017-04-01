/*
 * Only development usage
 */
import { EventEmitter } from 'events'
import { ServerResponse } from 'http'
import * as Koa from 'koa'
import * as Express from 'express'
import * as http from 'http'
import * as React from 'react'
import * as R from 'ramda'
import { renderToStaticMarkup } from 'react-dom/server'
import { RedBoxError } from 'redbox-react'

const constants = {
    SUBSCRIBE_ENDPOINT: '/__server_hmr',
    INIT_TYPE: 'INIT',
    ERROR_TYPE: 'ERROR',
    UPDATE_TYPE: 'UPDATE'
}

const ErrorPage: React.StatelessComponent<{ error: Error }> = ({ error }) => (
    <div>
        <span id="notification" />
        <div id="error">
            <RedBoxError error={error} />
        </div>
        <script>{`
            const notification = document.querySelector('#notification');
            const div = document.querySelector('#error');
            const es = new EventSource('${constants.SUBSCRIBE_ENDPOINT}');
            es.onmessage = ({ data }) => {
                debugger;
                const action = JSON.parse(data);
                switch(action.type) {
                    case '${constants.UPDATE_TYPE}':
                        es.close();
                        notification.innerHTML = '<h1>Reloading...</h1>';
                        setTimeout(function() {
                            window.location.reload()
                        }, 300);
                        break;
                    case '${constants.ERROR_TYPE}':
                        div.innerHTML = action.content;
                        break;
                }
            };
        `}
        </script>
    </div>
)

type GetApp = () => Promise<Koa>
type Action = { type: string }
type ErrorAction = { content: string }
type ModuleLoader = {
    import(path: string): Object
}

export default class ServerHotReload extends EventEmitter {
    static renderErrorPage(error: Error) {
        return renderToStaticMarkup(
            <ErrorPage error={error} />
        )
    }

    static actions = {
        init(): Action {
            return { type: constants.INIT_TYPE }
        },

        update() {
            return { type: constants.UPDATE_TYPE }
        },

        error(error: Error) {
            const content = renderToStaticMarkup(
                <RedBoxError error={error} />
            )
            return { type: constants.ERROR_TYPE, content }
        }
    }

    private subscribers: ServerResponse[] = []
    private config: {
        loader?: ModuleLoader,
        getApp?: GetApp
    } = {}

    public set loader(loader: ModuleLoader) {
        this.config.loader = loader
    }

    public set appGetter(getApp: GetApp) {
        this.config.getApp = getApp
    }

    public middleware: Koa.Middleware = async (ctx, next) => {
        try {
            await next()
            this.publish(
                ServerHotReload.actions.update()
            )
        } catch (err) {
            ctx.type = 'html'
            ctx.body = ServerHotReload.renderErrorPage(err)
        }
    }

    public send = R.curry(
        (action: Action, res: ServerResponse): void => {
            const data = `data: ${JSON.stringify(action)}\n\n`
            res.write(data)
        }
    )

    public subscribe(res: ServerResponse): () => void {
        const idx = this.subscribers.push(res)
        this.send(ServerHotReload.actions.init(), res)

        return () => {
            this.subscribers.splice(idx - 1, 1)
        }
    }

    public publish(action: Action): void {
        R.forEach(
            this.send(action),
            this.subscribers
        )
    }

    public getExpressMiddleware(): Express.RequestHandler {
        const router = Express.Router()

        // subscribe
        router.get(constants.SUBSCRIBE_ENDPOINT, (req, res) => {
            res.writeHead(200, {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache'
            })

            const unsubscribe = this.subscribe(res)

            req.on('close', () => {
                res.end()
                unsubscribe()
            })
        })

        // require app
        router.use(async (req, res, next) => {
            let isError = false
            let isHeadersSent = false
            const onError = (err) => {
                isError = true

                if (!isHeadersSent) {
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    })
                }

                res.end(
                    ServerHotReload.renderErrorPage(err)
                )
            }

            try {
                if (typeof this.config.getApp !== 'function') {
                    debugger
                    throw new Error('ServerHotReload: app getter failed')
                }

                const app = await this.config.getApp()
                app.onerror = onError
                isHeadersSent = true
            } catch (err) {
                onError(err)
                return
            } finally {
                if (!isError) {
                    this.publish(
                        ServerHotReload.actions.update()
                    )
                }

                // TODO: Clean subscribers
            }
        })

        return router
    }
}

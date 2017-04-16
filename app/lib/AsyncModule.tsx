import * as React from 'react'

type Module = { [key: string]: any, default?: any }
type DoLoad = () => Promise<Module>
type State = {
    module?: Module,
    error?: Error,
    isLoaded?: boolean
}

const moduleLoadSuccess = (module: Module) =>
    (prevState: State): State => ({
        ...prevState,
        module,
        isLoaded: true,
    })

const moduleLoadFailure = (error: Error) =>
    (prevState: State): State => ({
        ...prevState,
        error,
        isLoaded: true
    })

const ErrorComponent: React.StatelessComponent<{ error: Error }> =
    ({ error }) => (
        <div>{error}</div>
    )

export default (doLoad: DoLoad) =>
    class AsyncModule extends React.Component<any, State> {
        state = {
            module: null,
            error: null,
            isLoaded: false
        }

        componentDidMount() {
            doLoad()
                .then(module => {
                    this.setState(moduleLoadSuccess(module))
                })
                .catch(error => {
                    this.setState(moduleLoadFailure(error))
                })
        }

        render() {
            const { isLoaded, error, module } = this.state
            const Component = module && (module.default || module)

            return !isLoaded
                ? <div>Loading...</div>
                : error
                    ? <ErrorComponent error={error} />
                    : module
                        ? <Component {...this.props} />
                        : <ErrorComponent
                            error={new Error('module load failure')}
                        />
        }
    }

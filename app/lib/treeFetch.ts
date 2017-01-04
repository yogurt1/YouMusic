export default async function resolveTreeAction(components, ctx) {
    const {method} = ctx
    for (let component of components) {
        while (component.WrappedComponent) {
            component = component.WrappedComponent
        }

        const action = component[method]

        if (typeof(action) === "function") {
            await action(ctx)
        }
    }
}

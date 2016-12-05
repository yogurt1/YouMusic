export default function createImmutableReducer(initialState) {
    const cases = {};
    const reducer = (state = initialState, action) => {
        try {
            return cases[action.type](state, action);
        } catch (_) {
            return state;
        }
    };

    const createHandler = from => (state, action) => cases[from](state, action);

    Object.setPrototypeOf(reducer, Object.create({
        case(type, handler) {
            if (Array.isArray(type)) {
                type.map(t => this.case(t, handler));
                return reducer;
            }

            if (typeof handler === 'string') {
                cases[type] = cases[handler];
            } else {
                cases[type] = handler;
            }

            return reducer;
        },

        link(to, from) {
            if (Array.isArray(to)) {
                to.map(t => this.link(t, from));
                return reducer;
            }

            const handler = cases[from] || createHandler(from);
            return reducer.case(to, handler);
        },

        getCases() {
            return cases;
        }
    }));

    return reducer;
}

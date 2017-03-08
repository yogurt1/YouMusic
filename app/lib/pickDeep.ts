import * as R from "ramda"

export type Node = string | [ string, string[] ]

const propDeep = <T>(obj: Object, nodes: Node[]) => nodes
    .reduce(
        (ac, node) => {
            typeof node === "string"
                ? ac[node] = obj[node]
                : ac[node[0]] = propDeep(node[0], node[1])
            return ac
        },
        {}
    )

export default propDeep

import * as React from "react"
import {shallow, mount, render} from "enzyme"

const HelloWorld = () => (
    <div>
        <h1>Hello, world</h1>
    </div>
)

describe("<HelloWorld />", () => {
    it("contains h1", () => {
        const e = shallow(<HelloWorld />)
            .find("h1")
            .matchesElement(
                <h1>Hello, world</h1>
            )

        expect(e).toBe(true)
    })
})

import * as React from "react"
import { AppRegistry, View } from "react-native"
import { NativeRouter } from "react-router"
import { Route } from "react-native"

class App extends React.Component<null, null> {
    render() {
        return (
            <NativeRouter>
                <View>
                    <Route path="/" exact />
                </View>
            </NativeRouter>
        )
    }
}

AppRegistry.register("YouMusic", () => App)

const {app, BrowserWindow, Menu, crashReporter} = require("electron")
const config = {
    window: {
        width: 1024,
        height: 728
    }
}

crashReporter.start({
    productName: "YouMusic",
    companyName: "n/a",
    submitURL: "https://github.com/yogurt1/YouMusic/issues",
    autoSubmit: false
})

let mainWindow = null

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit()
})

app.on("ready", () => {
    mainWindow = new BrowserWindow(config.window)

    mainWindow.on("closed", () => {
        mainWindow = null
    })

    // menu = Menu.buildFromTemplate([])
    // mainWindow.setMenu(menu)
})

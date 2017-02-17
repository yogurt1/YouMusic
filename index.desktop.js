const path = require("path")
const { app, BrowserWindow } = require("electron")

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    })

    mainWindow.loadURL(`file://${__dirname}/index.desktop.html`)

    if (process.env.NODE_ENV !== "production") {
        mainWindow.webContents.openDevTools()
    }

    mainWindow.on("closed", function() {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

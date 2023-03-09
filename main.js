const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        title: "Cyclone",
        width: 800,
        height: 720,
        minWidth: 640,
        minHeight: 480,
        icon: path.join(__dirname, 'public', 'media', 'logo.ico'),
        webPreferences: {
            preload: path.join(__dirname, 'src', 'preload.js'),
            nodeIntegration: true
        }
    })

    win.loadFile(path.join('public', 'index.html'))
    win.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

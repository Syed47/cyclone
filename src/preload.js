const electron = require('electron')
const code = require('./code.js')

electron.contextBridge.exposeInMainWorld("api", { code })


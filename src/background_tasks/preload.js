const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    reloadETH: (data) => ipcRenderer.invoke('config:eth:reload', data),
    handleDataETH: (callback) => ipcRenderer.on('config:eth:data', callback)
})
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('catAPI', {

  getBreakSeconds: () => ipcRenderer.invoke('get-break-seconds'),
  breakDone:       () => ipcRenderer.send('break-done'),
  showCat:         () => ipcRenderer.send('show-cat'),

  getConfig:   () => ipcRenderer.invoke('get-config'),
  saveConfig:  (config) => ipcRenderer.invoke('save-config', config),
  
})
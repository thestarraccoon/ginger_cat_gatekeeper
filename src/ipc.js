const { ipcMain, app } = require('electron')
const { getConfig, saveConfig } = require('./config')
const { closeOverlay, showOverlay } = require('./windows')
const { resetTimer } = require('./timer')

function registerIPC(callbacks) {
  // ─── Overlay ────────────────────────────────────────────────────────────
  ipcMain.on('break-done', () => {
    closeOverlay()
  })

  ipcMain.on('show-cat', () => {
    callbacks.onShowCat()
  })

  // ─── Settings ──────────────────────────────────────────────────────────
  ipcMain.handle('get-config', () => getConfig())

  ipcMain.handle('save-config', (_, newConfig) => {
    saveConfig(newConfig)
    app.setLoginItemSettings({
        openAtLogin: newConfig.openAtLogin,
        name: 'Cat Gatekeeper',
    })
    callbacks.onReset()
    return true
  })

  ipcMain.handle('get-break-seconds', () => getConfig().breakSeconds)
}

module.exports = { registerIPC }
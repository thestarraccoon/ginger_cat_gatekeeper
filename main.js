const { app } = require('electron')
const { createTray, updateTrayMenu } = require('./src/tray')
const { startTimer, stopTimer, resetTimer } = require('./src/timer')
const { showOverlay, showSettings } = require('./src/windows')
const { registerIPC } = require('./src/ipc')

app.dock?.hide()

// ─── Callbacks ────────────────────────────────
const callbacks = {
  onTimerTick: () => {
    stopTimer()
    showOverlay(() => {
      startTimer(callbacks.onTimerTick)
      updateTrayMenu(callbacks)
    })
    updateTrayMenu(callbacks)
  },
  onShowCat: () => {
    stopTimer()
    showOverlay(() => {
      startTimer(callbacks.onTimerTick)
      updateTrayMenu(callbacks)
    })
    updateTrayMenu(callbacks)
  },
  onReset: () => {
    resetTimer(callbacks.onTimerTick, () => updateTrayMenu(callbacks))
  },
  onSettings: () => showSettings(),
  onQuit: () => app.quit(),
}

// ─── Start ────────────────────────────────────────────────────────────────
app.whenReady().then(() => {
  registerIPC(callbacks)
  createTray(callbacks)
  startTimer(callbacks.onTimerTick)
})

app.on('window-all-closed', (e) => {
  e.preventDefault()
})
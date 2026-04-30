const { BrowserWindow, screen, nativeImage, app } = require('electron')
const path = require('path')

let overlayWindow = null
let settingsWindow = null

// ─── Overlay ──────────────────────────────────────────────────────────────
function showOverlay(onClosed) {
  if (overlayWindow) return

  const { width, height } = screen.getPrimaryDisplay().workAreaSize

  overlayWindow = new BrowserWindow({
    width,
    height,
    x: 0,
    y: 0,
    transparent: true,
    frame: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    resizable: false,
    focusable: true,
    type: process.platform === 'linux' ? 'dock' : 'toolbar',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    }
  })

  overlayWindow.setAlwaysOnTop(true, 'screen-saver')
  overlayWindow.setVisibleOnAllWorkspaces(true)
  overlayWindow.loadFile(path.join(__dirname, 'overlay', 'overlay.html'))

  overlayWindow.on('closed', () => {
    overlayWindow = null
    if (onClosed) onClosed()
  })
}

function closeOverlay() {
  if (overlayWindow) {
    overlayWindow.close()
  }
}

function isOverlayOpen() {
  return overlayWindow !== null
}

// ─── Settings ────────────────────────────────────────────────────────────
function showSettings() {
  if (settingsWindow) {
    settingsWindow.focus()
    return
  }

  settingsWindow = new BrowserWindow({
    width: 420,
    height: 600,
    resizable: false,
    title: 'Cat Gatekeeper — Настройки',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    }
  })

  settingsWindow.loadFile(path.join(__dirname, 'settings', 'settings.html'))
  settingsWindow.setMenuBarVisibility(false)

  settingsWindow.on('closed', () => {
    settingsWindow = null
  })
}

module.exports = { showOverlay, closeOverlay, isOverlayOpen, showSettings }
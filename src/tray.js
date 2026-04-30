const { Tray, Menu, nativeImage } = require('electron')
const path = require('path')
const { getConfig } = require('./config')
const { getIsPaused, pause, resume } = require('./timer')
const { isOverlayOpen } = require('./windows')

let tray = null

function createTray(callbacks) {
  const icon = nativeImage.createFromPath(
    path.join(__dirname, '..', 'assets', 'icon.png')
  )
  const resized = icon.isEmpty()
    ? nativeImage.createEmpty()
    : icon.resize({ width: 16, height: 16 })

  tray = new Tray(resized)
  tray.setToolTip('Cat Gatekeeper')
  updateTrayMenu(callbacks)
}

function updateTrayMenu(callbacks) {
  const catActive = isOverlayOpen()
  const { workMinutes } = getConfig()
  const isPaused = getIsPaused()

  const menu = Menu.buildFromTemplate([
    { label: '🐱 Cat Gatekeeper', enabled: false },
    { type: 'separator' },
    {
      label: catActive
        ? '🐾 Кот сейчас на экране'
        : `⏱ Перерыв через ${workMinutes} мин`,
      enabled: false,
    },
    { type: 'separator' },
    {
      label: isPaused ? '▶ Возобновить' : '⏸ Пауза',
      click: () => {
        if (isPaused) {
          resume(callbacks.onTimerTick)
        } else {
          pause()
        }
        updateTrayMenu(callbacks)
      }
    },
    {
      label: '🔄 Сбросить таймер',
      enabled: !isPaused,
      click: () => callbacks.onReset(),
    },
    {
      label: '🐱 Показать кота сейчас',
      enabled: !catActive,
      click: () => callbacks.onShowCat(),
    },
    { type: 'separator' },
    {
      label: '⚙️ Настройки',
      click: () => callbacks.onSettings(),
    },
    { type: 'separator' },
    {
      label: '❌ Выйти',
      click: () => callbacks.onQuit(),
    }
  ])

  tray.setContextMenu(menu)
}

module.exports = { createTray, updateTrayMenu }
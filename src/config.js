const Store = require('./store')

const store = new Store()

function getConfig() {
  return {
    workMinutes: store.get('workMinutes', 60),
    breakSeconds: store.get('breakSeconds', 300),
    openAtLogin: store.get('openAtLogin', false),
    
    // processFilter: store.get('processFilter', [])
  }
}

function saveConfig(newConfig) {
  store.set('workMinutes', newConfig.workMinutes)
  store.set('breakSeconds', newConfig.breakSeconds)
  store.set('openAtLogin', newConfig.openAtLogin)
}

module.exports = { getConfig, saveConfig }
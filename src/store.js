const fs = require('fs')
const path = require('path')
const { app } = require('electron')

class Store {
  constructor() {
    this.filePath = path.join(app.getPath('userData'), 'config.json')
    this.data = this._load()
  }

  // ─── Read from disk ────────────────────────────────────────
  _load() {
    try {
      return JSON.parse(fs.readFileSync(this.filePath, 'utf-8'))
    } catch {
      return {}
    }
  }

  // ─── Write on disk ───────────────────────────
  _save() {
    fs.mkdirSync(path.dirname(this.filePath), { recursive: true })
    fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2))
  }

  // ─── API ────────────────────────────────────────────────────
  get(key, defaultValue) {
    return key in this.data ? this.data[key] : defaultValue
  }

  set(key, value) {
    this.data[key] = value
    this._save()
  }
}

module.exports = Store
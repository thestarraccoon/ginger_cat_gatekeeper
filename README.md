# 🐱 Cat Gatekeeper

Системный напоминатель о перерывах. Кот выходит поверх всех окон, садится, сидит пока не кончится таймер.

## Структура

```
cat-gatekeeper/
├── src/
│   ├── main.js         ← главный процесс (таймер, трей, окна)
│   ├── store.js        ← хранение настроек (JSON-файл)
│   ├── preload.js      ← мост между main и renderer
│   ├── overlay.html    ← окно с котом (прозрачное, поверх всего)
│   └── settings.html   ← окно настроек
├── assets/
│   ├── neko1.webm  ← ← ПОЛОЖИ СЮДА свои файлы
│   ├── neko2.webm   ← ← ПОЛОЖИ СЮДА свои файлы
│   └── icon.png        ← иконка для трея (16x16 или 32x32 PNG)
└── package.json
```

## Быстрый старт (разработка)

```bash
# 1. Установить Node.js: https://nodejs.org (LTS версия)
# 2. В папке проекта:
npm install
npm start
```

## Добавить своих котов

Положи файлы в `assets/`:
- `cat-enter.webm` — кот выходит и садится (играется один раз)
- `cat-idle.webm`  — кот сидит (в цикле пока идёт таймер)
- `icon.png`       — иконка в трее

## Сборка (один файл для раздачи)

```bash
npm install

# Windows → создаст dist/Cat Gatekeeper Setup.exe
npm run build:win

# Linux → создаст dist/Cat Gatekeeper.AppImage
npm run build:linux

# macOS → создаст dist/Cat Gatekeeper.dmg
npm run build:mac
```

Готовый файл будет в папке `dist/`.

## Настройки

Через иконку в трее → ⚙️ Настройки:
- Сколько минут работать до перерыва (1–120)
- Сколько секунд длится перерыв (5–300)

Конфиг хранится в:
- Windows: `%APPDATA%\cat-gatekeeper\config.json`
- Linux:   `~/.config/cat-gatekeeper/config.json`
- macOS:   `~/Library/Application Support/cat-gatekeeper/config.json`

## Логика видео

```
Таймер сработал
    → показать прозрачное окно поверх всего
    → играть cat-enter.webm (один раз, не в цикле)
    → когда закончился → играть cat-idle.webm (в цикле)
    → таймер обратного отсчёта считает вниз
    → последние 5 секунд → подсказка "кликни на кота"
    → клик по коту или 0:00 → окно закрывается → таймер перезапускается
```

## Подгонка размера кота

В `src/overlay.html` найди:
```css
#cat-container {
  width: 400px;
  height: 400px;
}
```
Подгони под размер своего видео.

## Задел на будущее: фильтр по приложениям

В `src/main.js` есть закомментированный `processFilter`.
Когда добавишь — раскомментируй и реализуй через:
```js
const { exec } = require('child_process')
// Windows: tasklist | findstr "chrome.exe"
// Linux:   pgrep -x chrome
```

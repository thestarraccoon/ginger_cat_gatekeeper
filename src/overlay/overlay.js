// ─── Elements ─────────────────────────────────────────────────────────────
const videoEnter  = document.getElementById('cat-enter')
const videoIdle   = document.getElementById('cat-idle')
const timerDisplay = document.getElementById('timer-display')
const clickHint   = document.getElementById('click-hint')
const catContainer = document.getElementById('cat-container')

// ─── States ────────────────────────────────────────────────────────────
let secondsLeft   = 300
let canClose      = true
let timerTick     = null
let autoCloseTimer = null

// ─── Assets path ────────────────────────────────────────────────────────
const assetsPath = window.location.pathname.includes('asar')
  ? window.location.href.replace(/src\/overlay\/overlay\.html.*/, '').replace('file:///', '') + 'assets/'
  : '../../assets/'

// ─── Utils ──────────────────────────────────────────────────────────────
function formatTime(s) {
  const m   = Math.floor(s / 60).toString().padStart(2, '0')
  const sec = (s % 60).toString().padStart(2, '0')
  return `${m}:${sec}`
}

// ─── Timer ───────────────────────────────────────────────────────────────
function startCountdown() {
  timerDisplay.textContent = formatTime(secondsLeft)

  timerTick = setInterval(() => {
    secondsLeft--
    timerDisplay.textContent = formatTime(secondsLeft)

    if (secondsLeft <= 5) {
      timerDisplay.classList.add('urgent')
      clickHint.classList.add('visible')
    }

    if (secondsLeft <= 0) {
      clearInterval(timerTick)
      timerDisplay.textContent = '🎉'
      clickHint.classList.add('visible')
      autoCloseTimer = setTimeout(() => window.catAPI.breakDone(), 3000)
    }
  }, 1000)
}

// ─── Close by click ────────────────────────────────────────────────────
document.addEventListener('click', () => {
  if (canClose) {
    clearInterval(timerTick)
    clearTimeout(autoCloseTimer)
    window.catAPI.breakDone()
  }
})

// ─── Play webm ────────────────────────────────────────────────
function playEnter() {
  videoIdle.src  = assetsPath + 'neko2.webm'
  videoIdle.loop = true
  videoIdle.load()

  videoEnter.src  = assetsPath + 'neko1.webm'
  videoEnter.loop = false

  const start = () => {
    catContainer.classList.add('visible')
    videoEnter.play()
    startCountdown()
  }

  videoEnter.oncanplay = () => {
    videoEnter.oncanplay = null
    requestAnimationFrame(start)
  }

  if (videoEnter.readyState >= 3) {
    videoEnter.oncanplay = null
    requestAnimationFrame(start)
  }

  videoEnter.onended = () => playIdle()
}

function playIdle() {
  videoEnter.style.display = 'none'
  videoIdle.style.display  = 'block'
  videoIdle.play()
}

// ─── Init ─────────────────────────────────────────────────────────────────
async function init() {
  secondsLeft = await window.catAPI.getBreakSeconds()
  timerDisplay.textContent = formatTime(secondsLeft)
  playEnter()
}

init()
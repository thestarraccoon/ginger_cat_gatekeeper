const { getConfig } = require('./config')

let timerInterval = null
let isPaused = false

function startTimer(onTick) {
  stopTimer()
  if (isPaused) return

  const { workMinutes } = getConfig()
  const ms = workMinutes * 60 * 1000

  console.log(`[Timer] Next break in ${workMinutes} min`)
  timerInterval = setTimeout(onTick, ms)
}

function stopTimer() {
  if (timerInterval) {
    clearTimeout(timerInterval)
    timerInterval = null
  }
}

function resetTimer(onTick, afterReset) {
  stopTimer()
  startTimer(onTick)
  if (afterReset) afterReset()
}

function pause() {
  isPaused = true
  stopTimer()
}

function resume(onTick) {
  isPaused = false
  startTimer(onTick)
}

function getIsPaused() {
  return isPaused
}

module.exports = { startTimer, stopTimer, resetTimer, pause, resume, getIsPaused }
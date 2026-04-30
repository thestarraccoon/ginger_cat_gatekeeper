// ─── Elements ─────────────────────────────────────────────────────────────
const workSlider = document.getElementById('work-slider')
const breakSlider = document.getElementById('break-slider')
const workVal = document.getElementById('work-val')
const breakVal = document.getElementById('break-val')
const savedMsg = document.getElementById('saved-msg')
const loginCheckbox = document.getElementById('login-checkbox')

// ─── Sliders ─────────────────────────────────────────────────────────────
workSlider.addEventListener('input', () => {
  workVal.textContent = `${workSlider.value} мин`
})

breakSlider.addEventListener('input', () => {
  breakVal.textContent = `${breakSlider.value} сек`
})

// ─── Save ────────────────────────────────────────────────────────────
document.getElementById('btn-save').addEventListener('click', async () => {
  await window.catAPI.saveConfig({
    workMinutes: parseInt(workSlider.value),
    breakSeconds: parseInt(breakSlider.value),
    openAtLogin: loginCheckbox.checked,
  })
  savedMsg.classList.add('show')
  setTimeout(() => savedMsg.classList.remove('show'), 2500)
})

// ─── Show cat ────────────────────────────────────────────────────────
document.getElementById('btn-test').addEventListener('click', async () => {
  await window.catAPI.saveConfig({
    workMinutes: parseInt(workSlider.value),
    breakSeconds: parseInt(breakSlider.value),
    openAtLogin: loginCheckbox.checked,
  })
  window.catAPI.showCat()
})



// ─── Load config due launch ────────────────────────────────────────
async function init() {
  const config = await window.catAPI.getConfig()
  workSlider.value = config.workMinutes
  breakSlider.value = config.breakSeconds
  workVal.textContent = `${config.workMinutes} мин`
  breakVal.textContent = `${config.breakSeconds} сек`
  loginCheckbox.checked = config.openAtLogin
}

init()
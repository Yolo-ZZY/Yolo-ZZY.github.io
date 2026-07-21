(() => {
  const siteStartedAt = Date.parse('2025-03-01T00:00:00+08:00')
  const second = 1000
  const minute = 60 * second
  const hour = 60 * minute
  const day = 24 * hour

  const updateRuntime = () => {
    const runtime = document.querySelector('#site-runtime')
    if (!runtime) return

    const elapsed = Math.max(0, Date.now() - siteStartedAt)
    const days = Math.floor(elapsed / day)
    const hours = Math.floor((elapsed % day) / hour)
    const minutes = Math.floor((elapsed % hour) / minute)
    const seconds = Math.floor((elapsed % minute) / second)

    runtime.innerHTML = `本站已安全运行 <span class="runtime-number runtime-days">${days}</span> 天 <span class="runtime-number runtime-hours">${hours}</span> 时 <span class="runtime-number runtime-minutes">${minutes}</span> 分 <span class="runtime-number runtime-seconds">${seconds}</span> 秒`
  }

  const startRuntime = () => {
    updateRuntime()
    window.setInterval(updateRuntime, second)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startRuntime, { once: true })
  } else {
    startRuntime()
  }
})()

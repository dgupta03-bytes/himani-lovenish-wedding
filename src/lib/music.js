import weddingData from '../data/weddingData'

/**
 * Soft generated tanpura drone (Pa–Sa–Sa–low Sa), used when no music file
 * is present in /public/music. Pure Web Audio — no asset needed.
 */
function createTanpura() {
  const AC = window.AudioContext || window.webkitAudioContext
  const ctx = new AC()
  const master = ctx.createGain()
  master.gain.value = 0
  const delay = ctx.createDelay()
  delay.delayTime.value = 0.32
  const feedback = ctx.createGain()
  feedback.gain.value = 0.35
  const wet = ctx.createGain()
  wet.gain.value = 0.4
  master.connect(ctx.destination)
  master.connect(delay)
  delay.connect(feedback).connect(delay)
  delay.connect(wet).connect(ctx.destination)

  const SA = 146.83
  const pattern = [SA * 0.75, SA, SA, SA / 2]
  let step = 0
  let timer

  const pluck = (freq, t) => {
    const env = ctx.createGain()
    env.gain.setValueAtTime(0, t)
    env.gain.linearRampToValueAtTime(0.5, t + 0.04)
    env.gain.exponentialRampToValueAtTime(0.001, t + 3.6)
    const lp = ctx.createBiquadFilter()
    lp.type = 'lowpass'
    lp.frequency.setValueAtTime(2400, t)
    lp.frequency.exponentialRampToValueAtTime(600, t + 3)
    env.connect(lp).connect(master)
    ;[1, 2, 3, 4, 5, 6].forEach((h, i) => {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = i === 0 ? 'triangle' : 'sine'
      o.frequency.value = freq * h
      o.detune.value = (Math.random() - 0.5) * 6
      g.gain.value = 0.5 / (h * 1.2)
      o.connect(g).connect(env)
      o.start(t)
      o.stop(t + 3.8)
    })
  }

  const tick = () => {
    pluck(pattern[step % 4], ctx.currentTime + 0.05)
    step++
    timer = setTimeout(tick, step % 4 === 0 ? 1500 : 950)
  }

  return {
    play() {
      ctx.resume()
      master.gain.cancelScheduledValues(ctx.currentTime)
      master.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 1.2)
      clearTimeout(timer)
      tick()
    },
    pause() {
      clearTimeout(timer)
      master.gain.cancelScheduledValues(ctx.currentTime)
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6)
    },
    close() {
      clearTimeout(timer)
      ctx.close()
    },
  }
}

/*
 * One shared player for the whole site, so the intro (which starts the song on
 * the guest's first tap) and the floating Music button stay in sync.
 * Browsers only allow sound after a user gesture, so play() must be called
 * from inside a tap/click handler — or it may be refused (autoplay policy).
 */
const VOLUME = 0.6
let audio = null
let drone = null
let usingDrone = false
let playing = false
let fadeTimer
const listeners = new Set()

function setPlaying(value) {
  playing = value
  listeners.forEach((fn) => fn(value))
}

function getAudio() {
  if (!audio && weddingData.music.src) {
    audio = new Audio(weddingData.music.src)
    audio.loop = true
    audio.preload = 'auto'
    audio.volume = 0
  }
  return audio
}

function fadeIn(a) {
  clearInterval(fadeTimer)
  fadeTimer = setInterval(() => {
    a.volume = Math.min(VOLUME, a.volume + 0.04)
    if (a.volume >= VOLUME) clearInterval(fadeTimer)
  }, 80)
}

function startDrone() {
  usingDrone = true
  drone ??= createTanpura()
  drone.play()
  setPlaying(true)
}

export const music = {
  subscribe(fn) {
    listeners.add(fn)
    return () => listeners.delete(fn)
  },
  get playing() {
    return playing
  },
  /** Start downloading the song early so it can begin instantly on tap. */
  preload() {
    getAudio()?.load()
  },
  /** Resolves true if sound started; false if the browser is still blocking autoplay. */
  async play() {
    if (playing) return true
    const a = usingDrone ? null : getAudio()
    if (!a) {
      startDrone()
      return true
    }
    try {
      await a.play()
      fadeIn(a)
      setPlaying(true)
      return true
    } catch (err) {
      if (err?.name === 'NotAllowedError') return false // needs a tap first
      startDrone() // file missing or unsupported
      return true
    }
  },
  pause() {
    clearInterval(fadeTimer)
    if (usingDrone) drone?.pause()
    else if (audio) {
      audio.pause()
      audio.volume = 0
    }
    setPlaying(false)
  },
  toggle() {
    return playing ? music.pause() : music.play()
  },
}

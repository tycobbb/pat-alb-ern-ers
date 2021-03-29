import { loadEl, loadAssets } from "./load.js"
import { init as initView, initData, sim, draw, poke, getCanvas, setColors, setPlate, setData, randomize, reset, setPoke } from "./view.js"
import { init as initPlates, onPlateChanged } from "./plates.js"
import { init as initPokes, setPokeFromPlate, onPokeChanged } from "./pokes.js"
import { init as initColors, onColorsChanged } from "./colors.js"
import { init as initDatas, setDataFromPlate, onDataChanged } from "./datas.js"

// -- constants --
const kFrameScale = 60 / 15

// -- props -
let mTime = null
let mFrame = 0
let mIsPaused = false

// -- p/els
let $mMain = null

// -- lifetime --
function main(assets) {
  console.debug("start")

  // capture els
  $mMain = document.getElementById("main")

  // initialize
  initData()
  initView("canvas", assets)
  initColors([0, 0, 1, 1, 2])
  initPokes()
  initPlates()
  initDatas()
  initEvents()

  // start loop
  loop()
}

// -- commands --
function loop() {
  if (!mIsPaused) {
    mTime = performance.now() / 1000

    // only run every kFrameScale frames
    if (isSimFrame()) {
      sim(mTime)
      draw()
    }

    mFrame++
  }

  requestAnimationFrame(loop)
}

function spawn(evt) {
  poke(
    evt.offsetX,
    evt.offsetY,
  )
}

function syncPlate(plate) {
  // apply to view
  setPlate(plate)

  // set default values on inputs
  setPokeFromPlate(plate)
  setDataFromPlate(plate)
}

function syncPoke(poke) {
  setPoke(poke)
}

function syncTheme(theme) {
  setColors(theme)
}

function syncData(data) {
  setData(data)
}

// -- queries --
function isSimFrame() {
  return mFrame % kFrameScale === 0
}

// -- events --
function initEvents() {
  // synchronize data
  onPlateChanged(syncPlate)
  onPokeChanged(syncPoke)
  onColorsChanged(syncTheme)
  onDataChanged(syncData)

  // add mouse events
  const $canvas = getCanvas()
  $canvas.addEventListener("click", didClickMouse)
  $canvas.addEventListener("mousemove", didMoveMouse)

  // add keyboard events
  document.addEventListener("keydown", didPressKey)

  // add misc events
  const $toggle = document.getElementById("toggle-ui")
  $toggle.addEventListener("click", didClickUiToggle)

  const $pause = document.getElementById("pause")
  $pause.addEventListener("click", didClickPause)
}

// -- e/mouse
function didClickMouse(evt) {
  spawn(evt)
}

function didMoveMouse(evt) {
  // if button is pressed
  if ((evt.buttons & (1 << 0)) != (1 << 0)) {
    return
  }

  // and this is an update frame
  if (!isSimFrame()) {
    return
  }

  spawn(evt)
}

// -- e/keyboard
function didPressKey(evt) {
  if (evt.key === "e") {
    randomize()
  } else if (evt.key === "r") {
    reset()
  }
}

// -- e/misc
function didClickUiToggle(_evt) {
  $mMain.classList.toggle("is-ui-hidden")
}

function didClickPause(evt) {
  mIsPaused = !mIsPaused
  const $el = evt.target
  $el.text = mIsPaused ? "unpause" : "pause"
}

// -- boostrap --
(async function load() {
  function p(path) {
    return `./src/${path}`
  }

  // wait for the window and all assets
  const [_w, assets] = await Promise.all([
    loadEl(window),
    loadAssets({
      shaders: {
        // shared
        sim: {
          vert: p("sim/sim.vert"),
        },
        draw: {
          vert: p("draw/draw.vert"),
          frag: p("draw/draw.frag"),
        },
        // plates
        plates: {
          ["gol"]: p("plates/gol.frag"),
          ["bar"]: p("plates/bar.frag"),
          ["sky"]: p("plates/sky.frag"),
          ["dot"]: p("plates/dot.frag"),
          ["swp"]: p("plates/swp.frag"),
        },
      },
    })
  ])

  // then start
  main(assets)
})()

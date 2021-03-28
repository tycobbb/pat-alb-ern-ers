import { loadEl, loadAssets } from "./load.js"
import { init as initView, sim, draw, poke, getCanvas, setTheme, setPlate, setData, randomize, reset, setPoke } from "./view.js"
import { init as initPlates, onPlateChanged } from "./plates.js"
import { init as initPokes, setPokeFromPlate, onPokeChanged } from "./pokes.js"
import { init as initColors, onColorsChanged } from "./colors.js"
import { init as initDatas, setDataFromPlate, onDataChanged } from "./datas.js"

// -- constants --
const kFrameScale = 60 / 15

// -- props -
let mTime = null
let mFrame = 0

// -- p/els
let $mOptions = null
let $mDataInputs = []

// -- lifetime --
function main(assets) {
  console.debug("start")

  // capture els
  $mOptions = document.getElementById("options")
  $mDataInputs = document.querySelectorAll("#data input")

  // initialize
  initView("canvas", assets)
  initColors([0, 1])
  initPokes()
  initPlates()
  initDatas()
  initEvents()

  // start loop
  loop()
}

// -- commands --
function loop() {
  mTime = performance.now() / 1000

  // only run every kFrameScale frames
  if (isSimFrame()) {
    sim(mTime)
    draw()
  }

  mFrame++
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
  setTheme(theme)
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

// -- boostrap --
(async function load() {
  function p(path) {
    return `./src/plates/${path}`
  }

  // wait for the window and all assets
  const [_w, assets] = await Promise.all([
    loadEl(window),
    loadAssets({
      shaders: {
        ["gol"]: {
          sim: {
            vert: p("gol/sim.vert"),
            frag: p("gol/sim.frag"),
          },
          draw: {
            vert: p("gol/draw.vert"),
            frag: p("gol/draw.frag"),
          },
        },
        ["bar"]: {
          sim: {
            vert: p("bar/sim.vert"),
            frag: p("bar/sim.frag"),
          },
          draw: {
            vert: p("bar/draw.vert"),
            frag: p("bar/draw.frag"),
          },
        },
        ["v-3"]: {
          sim: {
            vert: p("v-3/sim.vert"),
            frag: p("v-3/sim.frag"),
          },
          draw: {
            vert: p("v-3/draw.vert"),
            frag: p("v-3/draw.frag"),
          },
        }
      }
    })
  ])

  // then start
  main(assets)
})()

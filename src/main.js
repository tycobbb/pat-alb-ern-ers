import { loadEl, loadAssets } from "./load.js"
import { init as initView, sim, draw, poke, getCanvas, setTheme } from "./view.js"
import { init as initColors, getEl as getColorsEl, getColors } from "./colors.js"

// -- constants --
const kFrameScale = 60 / 15

// -- props -
let mTime = null
let mFrame = 0

// -- p/els
let $mOptions

// -- lifetime --
function main(assets) {
  console.debug("start")

  // initialize
  $mOptions = document.getElementById("options")
  initView("canvas", assets)
  initColors([0, 1])
  initEvents()

  // initial theme
  syncTheme()

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

function syncTheme() {
  setTheme(getColors())
}

// -- queries --
function isSimFrame() {
  return mFrame % kFrameScale === 0
}

// -- events --
function initEvents() {
  const $colors = getColorsEl()
  $colors.addEventListener("input", didChangeColors)

  const $canvas = getCanvas()
  $canvas.addEventListener("click", didClickMouse)
  $canvas.addEventListener("mousemove", didMoveMouse)
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

// -- e/options
function didChangeColors(_evt) {
  syncTheme()
}

// -- boostrap --
(async function load() {
  // wait for the window and all assets
  const [_w, assets] = await Promise.all([
    loadEl(window),
    loadAssets({
      shaders: {
        sim: {
          vert: "./src/sim/sim.vert",
          frag: "./src/sim/sim.frag",
        },
        draw: {
          vert: "./src/draw/draw.vert",
          frag: "./src/draw/draw.frag",
        }
      }
    })
  ])

  // then start
  main(assets)
})()

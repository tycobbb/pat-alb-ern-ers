import { loadEl, loadAssets } from "./load.js"
import { init as initView, sim, draw, poke, getCanvas } from "./view.js"

// -- constants --
const kFrameScale = 60 / 15

// -- props -
let mTime = null
let mFrame = 0

// -- lifetime --
function main(assets) {
  console.debug("start")

  // initialize
  initView("canvas", assets)
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

// -- queries --
function isSimFrame() {
  return mFrame % kFrameScale === 0
}

// -- events --
function initEvents() {
  const c = getCanvas()
  c.addEventListener("click", didClickMouse)
  c.addEventListener("mousemove", didMoveMouse)
}

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

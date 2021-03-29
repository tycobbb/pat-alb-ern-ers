import { renderValues } from "./utils.js"

// -- constants --
const kPokes = {
  ...initPoke({
    name: "glider",
    w: 3,
    h: 3,
    data: [
      0, 1, 0,
      0, 0, 1,
      1, 1, 1,
    ]
  }),
  ...initPoke({
    name: "square",
    w: 3,
    h: 3,
    data: [
      1, 1, 1,
      1, 1, 1,
      1, 1, 1,
    ],
  }),
  ...initPoke({
    name: "circle",
    w: 4,
    h: 4,
    data: [
      0, 1, 1, 0,
      1, 1, 1, 1,
      1, 1, 1, 1,
      0, 1, 1, 0,
    ],
  }),
}

const kTemplate = `
  <div class="Select">
    <select id="poke" class="Select-input">
      ${renderValues(kPokes, (p) => `
        <option value="${p.name}">${p.name}</option>
      `)}
    </select>
  </div>
`

// -- props --
let $mInput = null

// -- lifetime --
export function init() {
  // render select
  const $mPokes = document.getElementById("pokes")
  $mPokes.innerHTML = kTemplate

  // cache input
  $mInput = $mPokes.querySelector("#poke")
}

function initPoke(props) {
  const plate = {
    ...props,
    get w2() {
      return Math.trunc(this.w / 2)
    },
    get h2() {
      return Math.trunc(this.h / 2)
    },
  }

  return {
    [props.name]: plate
  }
}

// -- commands --
export function onPokeChanged(action) {
  action(getPoke())

  $mInput.addEventListener("input", () => {
    action(getPoke())
  })
}

export function setPokeFromPlate(plate) {
  const name = plate.poke in kPokes ? plate.poke : "glider"
  $mInput.value = name

  $mInput.dispatchEvent(new InputEvent("input"))
}

// -- queries --
function getPoke() {
  return kPokes[$mInput.value]
}

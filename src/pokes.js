import { renderValues } from "./utils.js"

// -- constants --
const kPokes = {
  ...initPoke({
    name: "glider",
    size: {
      x: 3,
      y: 3,
    },
    data: [
      0, 1, 0,
      0, 0, 1,
      1, 1, 1,
    ]
  }),
  ...initPoke({
    name: "square",
    size: {
      x: 3,
      y: 3,
    },
    data: [
      1, 1, 1,
      1, 1, 1,
      1, 1, 1,
    ],
  }),
  ...initPoke({
    name: "circle",
    size: {
      x: 4,
      y: 4,
    },
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
let $mPoke = null

// -- lifetime --
export function init() {
  // render select
  const $mPokes = document.getElementById("pokes")
  $mPokes.innerHTML = kTemplate

  // cache input
  $mPoke = $mPokes.querySelector("#poke")
}

function initPoke(props) {
  const plate = {
    ...props,
    getData(name) {
      return this.data[name]
    }
  }

  return {
    [props.name]: plate
  }
}

// -- queries --
export function getPoke() {
  return kPokes[$mPoke.value]
}

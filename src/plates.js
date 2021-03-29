import { renderValues } from "./utils.js"

// -- constants --
const kPlates = {
  ...initPlate({
    name: "gol",
    poke: "glider",
    data: {
      float0: 0.0,
      float1: 0.0,
    },
  }),
  ...initPlate({
    name: "bar",
    poke: "square",
    data: {
      float0: 5.0,
      float1: 0.0,
    },
  }),
  ...initPlate({
    name: "v-3",
    poke: "square",
    data: {
      float0: 0.70,
      float1: 0.98,
    },
  }),
}

const kTemplate = `
  <div class="Select">
    <select id="plate" class="Select-input">
      ${renderValues(kPlates, (p) => `
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
  const $mPlates = document.getElementById("plates")
  $mPlates.innerHTML = kTemplate

  // cache input
  $mInput = $mPlates.querySelector("#plate")
}

function initPlate(props) {
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

// -- commands --
export function onPlateChanged(action) {
  action(getPlate())

  $mInput.addEventListener("input", () => {
    action(getPlate())
  })
}

// -- queries --
function getPlate() {
  return kPlates[$mInput.value]
}

import { renderValues } from "./utils.js"

// -- constants --
const kPlates = {
  ...initPlate({
    name: "gol",
    poke: "glider",
  }),
  ...initPlate({
    name: "bar",
    poke: "square",
    data: {
      float0: 5.0,
    },
  }),
  ...initPlate({
    name: "sky",
    poke: "point",
    data: {
      float0: 8,
      float1: 0.70,
      float2: 0.98,
    },
  }),
  ...initPlate({
    name: "dot",
    poke: "point",
  }),
  ...initPlate({
    name: "swp",
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
  const {
    data,
    ...rest
  } = props

  const plate = {
    poke: "point",
    ...rest,
    data: {
      float0: 0.0,
      float1: 0.0,
      float2: 0.0,
      float3: 0.0,
      ...data,
    },
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

import { renderValues } from "./utils.js"

// -- constants --
const kPlates = {
  ...initPlate({
    name: "gol",
    data: {
      int0: 0,
    },
  }),
  ...initPlate({
    name: "bar",
    data: {
      int0: 5,
    },
  }),
  ...initPlate({
    name: "v-3",
    data: {
      int0: 5,
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
let $mPlate = null

// -- lifetime --
export function init() {
  // render select
  const $mPlates = document.getElementById("plates")
  $mPlates.innerHTML = kTemplate

  // cache input
  $mPlate = $mPlates.querySelector("#plate")
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

// -- queries --
export function getPlate() {
  return kPlates[$mPlate.value]
}

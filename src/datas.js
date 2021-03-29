import { renderValues } from "./utils.js"

// -- constants --
const kDatas = [
  "float0",
  "float1",
  "float2",
  "float3",
]

const kTemplate = `
  ${renderValues(kDatas, (d) => `
    <div class="Field">
      <label for="${d}" class="Field-title">${d}</label>
      <input id="${d}" name="${d}" type="number">
    </div>
  `)}
`

// -- props --
let $mData = null
let $mInputs = null

// -- lifetime --
export function init() {
  // render select
  $mData = document.getElementById("data")
  $mData.innerHTML = kTemplate

  // cache input
  $mInputs = $mData.querySelectorAll("input")
}

// -- commands --
export function onDataChanged(action) {
  action(getData())

  $mData.addEventListener("input", () => {
    action(getData())
  })
}

export function setDataFromPlate(plate) {
  for (const $input of $mInputs) {
    $input.value = plate.getData($input.name)
  }

  $mData.dispatchEvent(new InputEvent("input"))
}

// -- queries --
function getData() {
  const data = {}

  // roll up inputs
  for (const $el of $mInputs) {
    data[$el.name] = $el.value
  }

  return data
}

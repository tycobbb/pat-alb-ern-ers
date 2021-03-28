import { renderValues } from "./utils.js"

// -- constants --
const kDatas = [
  "int0"
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
let $mInputs = null

// -- lifetime --
export function init() {
  // render select
  const $mData = document.getElementById("data")
  $mData.innerHTML = kTemplate

  // cache input
  $mInputs = $mData.querySelectorAll("input")
}

// -- commands --
export function setDataFromPlate(plate) {
  for (const $input of $mInputs) {
    $input.value = plate.getData($input.name)
  }
}

// -- queries --
export function getData() {
  const data = {}

  // roll up inputs
  for (const $el of $mInputs) {
    data[$el.name] = Number.parseInt($el.value)
  }

  return data
}
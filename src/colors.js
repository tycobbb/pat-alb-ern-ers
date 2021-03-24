// -- constants --
const kColors = [
  "#ff0000",
  "#00ff00",
  "#0000ff",
]

const kTemplate = `
  <div class="ColorPicker">
    <p class="ColorPicker-title">
      color x
    </p>

    <select class="ColorPicker-select">
      ${kColors.map((color, i) => `
        <option
          class="ColorPicker-option"
          value="${i}"
          style="color: ${getStyleHex(color)};"
        >
          ${color}
        </option>
      `).join("")}

      <option
        class="ColorPicker-customOption"
        value="custom"
        style="color: black;"
      >
        custom
      </option>
    </select>

    <input
      class="ColorPicker-custom"
      type="color"
      name="color"
      value="#000000"
    >
  </div>
`

// -- props --
let $mColors = null
let $mTemplate = null

// -- lifetime --
export function init(colors) {
  $mColors = document.getElementById("colors")
  if ($mColors == null) {
    return console.error("could not find colors conatiner")
  }

  // build template
  const $el = document.createElement("div")
  $el.innerHTML = kTemplate
  $mTemplate = $el.firstElementChild

  // add initial colors
  addColors(colors)
}

// -- commands --
export function addColors(colors = []) {
  let i = 0
  for (const color of colors) {
    const $el = $mTemplate.cloneNode(true)

    // set title
    $el.querySelector(".ColorPicker-title").innerText = `color ${i}`

    // set initial value
    setPickerColor($el, color)

    // add events
    $el.addEventListener("change", didClickOption)

    // append el
    $mColors.appendChild($el)

    i++
  }
}

function setPickerColor($el, color) {
  const hex = getColorHex($el, color)
  const value = getColorValue(color)
  const isCustom = value === "custom"

  // set current value
  $el.setAttribute("color", hex)

  // update select value, color
  const $select = $el.querySelector(".ColorPicker-select")
  $select.value = value
  $select.style.color = getStyleHex(hex)

  // update custom option color
  const $option = $select.querySelector(".ColorPicker-customOption")
  $option.style.color = isCustom ? getStyleHex(hex) : "black"

  // show custom picker if necessary
  $el.classList.toggle("is-custom", isCustom)
}

// -- queries --
export function getEl() {
  return $mColors
}

export function getColors() {
  return Array.from($mColors.children).map(($el) => {
    return $el.getAttribute("color")
  })
}

function getColorHex($el, color) {
  const i = Number.parseInt(color)
  if (!Number.isNaN(i)) {
    return kColors[i]
  } else if (color === "custom") {
    return $el.querySelector(".ColorPicker-custom").value
  } else {
    return color
  }
}

function getColorValue(color) {
  if (!Number.isNaN(Number.parseInt(color))) {
    return color
  } else {
    return "custom"
  }
}

function getStyleHex(hex) {
  if (hex === "#ffffff") {
    return "black"
  } else {
    return hex
  }
}

// -- events --
function didClickOption(evt) {
  const $el = evt.currentTarget
  const $select = evt.target
  setPickerColor($el, $select.value)
}

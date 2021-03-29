// -- constants --
const kColors = [
  "#b68a5b",
  "#b86661",
  "#63a5af",
]

const kTemplate = `
  <div class="ColorPicker Field">
    <p class="Field-title">
      color <span class="ColorPicker-idx">x</span>
    </p>

    <div class="Select">
      <select class="Select-input">
        ${kColors.map((color, i) => `
          <option
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
    </div>

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
export function onColorsChanged(action) {
  action(getColors())

  $mColors.addEventListener("input", () => {
    action(getColors())
  })
}

export function addColors(colors = []) {
  let i = 0
  for (const color of colors) {
    const $el = $mTemplate.cloneNode(true)

    // set title
    $el.querySelector(".ColorPicker-idx").innerText = `${i}`

    // set initial value
    setPickerColor($el, color)

    // add events
    $el.addEventListener("input", didClickOption)

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
  const $select = $el.querySelector(".Select-input")
  $select.value = value
  $select.style.color = getStyleHex(hex)

  // update custom option color
  const $option = $select.querySelector(".ColorPicker-customOption")
  $option.style.color = isCustom ? getStyleHex(hex) : "black"

  // show custom picker if necessary
  $el.classList.toggle("is-custom", isCustom)
}

// -- queries --
function getColors() {
  const colors = Array.from($mColors.children).map(($el) => {
    return $el.getAttribute("color")
  })

  return {
    bg: colors.slice(0, 4),
    fg: colors.slice(4),
  }
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

export function renderValues(collection, render) {
  return Object.values(collection).map(render).join("")
}

export function getRgbaFromHex(hex) {
  let str = hex
  if (hex[0] === "#") {
    str = str.slice(1)
  }

  const val = Number.parseInt(str, 16)
  return [
    ((val & 0xFF0000) >> 16) / 255.0,
    ((val & 0x00FF00) >> 8) / 255.0,
    ((val & 0x0000FF) >> 0) / 255.0,
    1
  ]
}

// -- constants --
const kPlates = {
  ...initPlate({
    name: "gol",
    data: {
      int0: 0,
    },
  }),
  ...initPlate({
    name: "v-3",
    data: {
      int0: 5,
    },
  }),
}

// -- props --
let $mPlate = null

// -- lifetime --
export function init() {
  $mPlate = document.getElementById("plate")
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

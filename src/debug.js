Object.defineProperties(Object.prototype, {
  ll: {
    get() {
      console.log(
        "%cDEBUG",
        "color: #fff; background: green;padding:0 5px ",
        this
      )
      return this
    },
  },
  llt: {
    get() {
      console.trace(
        "%cDEBUG",
        "color: #fff; background: green;padding:0 5px ",
        this
      )
      return this
    },
  },
  lll: {
    get() {
      return e => {
        console.log(
          "%cDEBUG-> " + e,
          "color: #fff; background: green;padding:0 5px ",
          this
        )
        return this
      }
    },
  },
})

export function arrayDiff(A, B) {
  return [...A, ...B].filter(e => !(A.includes(e) && B.includes(e)))
}

export function arraySame(A, B) {
  return [...new Set([...A, ...B].filter(e => A.includes(e) && B.includes(e)))]
}

window.suspend = function (n = 1000) {
  const t = Date.now()
  while (Date.now() - t < n) {}
}

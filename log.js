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

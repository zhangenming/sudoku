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

window.suspend = function (n = 1000) {
  const t = Date.now()
  while (Date.now() - t < n) {}
}

function time(key) {
  const now = performance.now()
  var obj = time[key]
  if (!obj) {
    obj = time[key] = { count: 1, isBegin: true, time: [0] }
    setTimeout(() => {
      const count = obj.count / 2
      const all = obj.time.reduce((q, w) => q + w).toFixed(5)
      const allSelf = (0.0006 * count).toFixed(5)
      const allReal = all - allSelf
      ;({
        key,
        all,
        allSelf,
        // allReal,
        count,
        per: (all / count).toFixed(5),
      }.ll)
    })
  } else {
    obj.count++
    obj.isBegin = obj.count % 2
  }

  //致命bug 本身有计算时间
  //解决方式
  if (obj.isBegin) {
    obj.beginT = now
  } else {
    obj.time.push(now - obj.beginT)
  }
  performance.now() - now
  return obj
}
document.onclick = () => {
  ;(11).ll
  getTheBestTime(function name(params) {
    console.log(1)
  })
}

function getTheBestTime(func) {
  console.time()
  const times = []
  ;[...Array(22)].map(() => {
    const n = performance.now()
    func()
    times.push(performance.now() - n)
  })
  times.sort()[0].ll
  console.timeEnd()
}

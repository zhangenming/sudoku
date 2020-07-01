export function isValue(item) {
  return !Array.isArray(item.maybes)
}
export function isMaybe(item) {
  return Array.isArray(item.maybes)
}
export function string2value(STR) {
  return (
    STR &&
    STR.split("").reduce((all, now, index) => {
      const n = Math.floor(index / 9)
      all[n] || (all[n] = [])
      all[n].push(Number(now))
      return all
    }, [])
  )
}
var count = 0
Object.defineProperties(Object.prototype, {
  ll: {
    get() {
      if (count++ > 1000) {
        return console.log("log超载")
      }
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

export function getTheBestTime(funcs, N = 1e5) {
  console.log("start")

  const map = [...Array(N)]

  //限定次数/限定时间
  //自身执行时间?
  funcs.map(func => {
    console.time()
    const times = []
    map.map(() => {
      const n = performance.now()
      ;[...Array(111)].map(func)
      times.push(performance.now() - n)
    })
    //   8149: 0.004999994416721165
    times.sort()
    //   times.sort().filter(e => e == 0).length.ll //耗时0数量占比
    //   times.sort().splice(-(N / 2)) //丢弃1/5最大值
    const all = times.reduce((q, w) => q + w)
    console.log({
      min: times[0].toFixed(3),
      avg: (all / times.length).toFixed(5),
      all: Number(all.toFixed(5)),
    })
    console.timeEnd()
  })
}

function test(funcs) {
  funcs.forEach(f => {
    console.time(f.name)
    ;[...Array(11000)].forEach(f)
    console.timeEnd(f.name)
  })
}
// test(
//   [
//     () => [...SDK_HANG, ...SDK_LIE, ...SDK_AREA].forEach(basic),
//     () => [...SDK_HANG, ...SDK_LIE, ...SDK_AREA].forEach(basicMB3),
//   ]
// )

//////////   last item: args.pop() or [...args].pop()

console.clear()
console.time()
const A3 = [...Array(3).keys()]
const A9 = [...Array(9).keys()]
const A9from1 = [...A9].map(e => e + 1)

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
const index2flex = A3.map(y =>
  A3.map(x => A3.map(l => A3.map(r => [l + y * 3, r + x * 3])))
).flat(3)

function flex2index([squre, index]) {
  return index2flex.map(e => "" + e).findIndex(e => e === `${squre},${index}`)
} //todo with MAP
function hang2lie(row) {
  return A9.map(x => A9.map(y => row[y][x]))
}
function hang2area(hang) {
  const flat = hang.flat()
  return A9.map(squre =>
    A9.map(index => {
      const i = flex2index([squre, index])
      return flat[i]
    })
  )
}
export function isValue(item) {
  return !Array.isArray(item.ItemMayBeValue)
}
export function isMaybe(item) {
  return Array.isArray(item.ItemMayBeValue)
}
function string2value() {
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
function merge() {
  SDK.map(e =>
    e.map(e => {
      if (e.ItemMayBeValue.length === 1) {
        e.ItemMayBeValue = e.ItemMayBeValue[0]
      }
    })
  )
  runBasic()
}

const STR =
  "810003290067000000900500006000408000604000809000209000700001008000000370053800042"

const VALUE = string2value(STR) || [
  [2, 1, 6, 0, 8, 0, 9, 5, 7],
  [7, 8, 9, 0, 1, 0, 0, 0, 3],
  [5, 4, 0, 2, 9, 7, 0, 1, 6],
  [6, 7, 0, 0, 3, 5, 0, 9, 4],
  [4, 0, 8, 9, 6, 1, 7, 0, 5],
  [9, 5, 0, 0, 4, 2, 0, 6, 8],
  [1, 6, 0, 4, 2, 8, 0, 3, 9],
  [0, 9, 4, 0, 5, 0, 0, 0, 2],
  [3, 2, 5, 0, 7, 0, 4, 8, 1],
]

export const SDK = VALUE.map((e, H) =>
  e.map((value, L) => {
    const index = H * 9 + L
    const [A, a] = index2flex[index]
    return {
      ItemMayBeValue: value === 0 ? [...A9from1] : value,
      H,
      L,
      A,
      a,
      index,
    }
  })
).ll

const SDK_HANG = (window.SDK = SDK)
const SDK_LIE = hang2lie(SDK_HANG)
export const SDK_AREA = hang2area(SDK_HANG)

function basicRS(group) {
  const values = group.filter(isValue).map(e => e.ItemMayBeValue)
  const maybes = group.filter(isMaybe)
  return values.forEach(value =>
    maybes.forEach(maybe => {
      const index = maybe.ItemMayBeValue.indexOf(value)
      index != -1 && maybe.ItemMayBeValue.splice(index, 1)
    })
  )
}
function basicMB2(group) {
  const values = group.filter(isValue).map(e => e.ItemMayBeValue)
  const maybes = group.filter(isMaybe)
  maybes.forEach(maybe => {
    maybe.ItemMayBeValue = maybe.ItemMayBeValue.filter(e => !values.includes(e))
  })
}
function basicMB(group) {
  const values = group.filter(isValue).map(e => e.ItemMayBeValue)
  const maybes = group.filter(isMaybe)
  maybes.forEach(maybe => {
    values.forEach(value => {
      const index = maybe.ItemMayBeValue.indexOf(value)
      index != -1 && maybe.ItemMayBeValue.splice(index, 1)
    })
  })
}
function basicRScache(group) {
  //分解模式
  const values = group.filter(isValue)
  const maybes = group.filter(isMaybe)
  return values.forEach(value => deleteArr(maybes, value))

  function deleteArr(maybes, target) {
    maybes.forEach(maybe => deleteTarget(maybe, target))
  }
  function deleteTarget(maybe, target) {
    const index = maybe.ItemMayBeValue.indexOf(target.ItemMayBeValue)
    index != -1 && maybe.ItemMayBeValue.splice(index, 1)
  }
}

;[...SDK_HANG, ...SDK_LIE, ...SDK_AREA].forEach(basicMB2)

window.test = function test() {
  const funcs = [
    () => A.forEach(basicRS),
    () => A.forEach(basicMB),
    () => A.forEach(basicMB2),
  ]
  const N = [...Array(11000)]
  const A = [...SDK_HANG, ...SDK_LIE, ...SDK_AREA]

  funcs.forEach(f => {
    console.time(f.name)
    N.forEach(f)
    console.timeEnd(f.name)
  })
}
window.test()
// runBasic() //默认执行
function runBasic() {
  ;[...SDK_HANG, ...SDK_LIE, ...SDK_AREA].forEach(basicMB)
  //吃惊 就这?  这就完了?  我3天 72小时就写了点这???
  //第一次有这种体验  是原来的代码太差吗?  有时间了重写看看之前的代码 理清楚思路
  //重写的过程中以及结束后为什么没有遇到字符串转换问题 包括row/col;x/y;hang/lie问题; 数组起点0+/1+问题
  //数组结构丢失位置信息
}
// basicRS2()
// function basicRS2() {
//   SDK_HANG.map(group =>
//     group.map(item => {
//       item.ll
//     })
//   )
// }
// merge()
// merge()
// merge()
// merge()
console.timeEnd()

// 基本值的求值思路
// 1,遍历所有的已知格, 排除未知格里的值
// 2,遍历所有的未知格，用附近已知格排除自己格里的值
// 哪个性能好 ?

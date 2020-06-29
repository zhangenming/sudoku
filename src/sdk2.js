const STR =
  "600007001070400000010000500008050307390020015105030800002000030000008090400600008"

console.clear()
const A3 = [...Array(3).keys()]
const A9 = [...Array(9).keys()]
const A10 = [...Array(10).keys()]
const A9from1 = [...A9].map(e => e + 1)

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
  return !Array.isArray(item.maybes)
}
export function isMaybe(item) {
  return Array.isArray(item.maybes)
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
function merge(level = 1) {
  SDK_FLAT.forEach(e => {
    if (e.maybes.length === 1) {
      e.maybes = e.maybes[0]
    }
    if (level >= 2 && e.l2) {
      e.maybes = e.l2
    }
  })
  compute(1)
}

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
      maybes: value === 0 ? [...A9from1] : value,
      H,
      L,
      A,
      a,
      index,
    }
  })
).ll
const SDK_FLAT = SDK.flat()

const SDK_HANG = (window.SDK = SDK)
const SDK_LIE = hang2lie(SDK_HANG)
export const SDK_AREA = hang2area(SDK_HANG)
const ALL = [...SDK_HANG, ...SDK_LIE, ...SDK_AREA] //各种重复,3遍

function basic(group) {
  const values = group.filter(isValue).map(e => e.maybes)
  const maybes = group.filter(isMaybe).map(e => e.maybes)
  values.forEach(value =>
    maybes.forEach(maybe => {
      const index = maybe.indexOf(value)
      index != -1 && maybe.splice(index, 1)
    })
  )
  //分解模式
  return
  values.forEach(value => deleteArr(maybes, value))
  function deleteArr(maybes, value) {
    maybes.forEach(maybe => deleteTarget(maybe, value))
  }
  function deleteTarget(maybe, value) {
    const index = maybe.indexOf(value)
    index != -1 && maybe.splice(index, 1)
  }
}
function basicMB3(group) {
  const values = group.filter(isValue).map(e => e.maybes)
  const maybes = group.filter(isMaybe) //不能 改引用
  maybes.forEach(maybe => {
    maybe.maybes = maybe.maybes.filter(e => !values.includes(e))
  })
}

window.test = function test() {
  const N = [...Array(11000)]
  const A = [...SDK_HANG, ...SDK_LIE, ...SDK_AREA]
  ;[
    function f1(params) {
      A.forEach(basic)
    },
    function f2(params) {
      A.forEach(basicMB3)
    },
  ].forEach(function ff(f) {
    console.time()
    N.forEach(f)
    console.timeEnd()
  })
}
// window.test()

function compute(level = 1) {
  ALL.forEach(basic)
  level >= 2 && ALL.forEach(level2)
}

compute(1) //init
merge(1)
merge(1)
merge(1)
merge(1)
merge(1)
compute(2)

function level2(group = SDK_AREA[8]) {
  group
    .filter(isMaybe)
    .reduce(
      (all, now) => {
        now.maybes.forEach(maybe => {
          all[maybe].cell.push(now.a)
          all[maybe].item = now
        })
        return all
      },
      A10.map(e => ({ e, cell: [] }))
    )
    .filter(e => e.cell.length === 1)
    .map(e => {
      e.item.l2 = e.e
    })
  //代码很脏 逻辑混乱 以前是怎么写的?忘了...
}


//吃惊 就这?  这就完了?  我3天 72小时就写了点这???
//第一次有这种体验  是原来的代码太差吗?  有时间了重写看看之前的代码 理清楚思路
//重写的过程中以及结束后为什么没有遇到字符串转换问题 包括row/col;x/y;hang/lie问题; 数组起点0+/1+问题
//数组结构丢失位置信息

// merge()
// merge()
// merge()
// merge()

// 基本值的求值思路
// 1,遍历所有的已知格, 排除未知格里的值
// 2,遍历所有的未知格，用附近已知格排除自己格里的值
// 哪个性能好 ?

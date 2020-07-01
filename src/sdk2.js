import { isValue, isMaybe, string2value, getTheBestTime } from "./debug.js"
export { SDK_AREA }
console.clear()

const STR =
  "802610000000004300940720000510000600600040008007000012000071039005400000000062801"

;(44).ll
const A3 = [...Array(3).keys()]
const A9 = [...Array(9).keys()]
const A9start1 = [...A9].map(e => e + 1)
const A10 = [...Array(10).keys()]

const index2flex = A3.map(y =>
  A3.map(x => A3.map(l => A3.map(r => [l + y * 3, r + x * 3])))
).flat(3)

function flex2index([H, L]) {
  const l = Math.floor(L / 3)
  const h = Math.floor(H / 3)
  const area = h * 3 + l

  const x = L % 3
  const y = H % 3
  const index = y * 3 + x

  return area * 9 + index //idx
  return [area, index] //pos

  return (
    (Math.floor(H / 3) * 3 + Math.floor(L / 3)) * 9 + ((H % 3) * 3 + (L % 3))
  )
  function flex2index([H, L]) {
    return index2flex.map(e => "" + e).findIndex(e => e === `${H},${L}`)
  }
}

function index2pos(index) {
  return [index % 9, Math.floor(index / 9)] //[x,y]
}
function hang2lie() {
  return A9.map(x => A9.map(y => SDK[y][x]))
}
function hang2area() {
  return A9.map(area =>
    A9.map(indexArea => {
      // [1,0] => [0,4]
      const i = flex2index([area, indexArea])
      return SDK_FLAT[i]
    })
  )
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
const SDK = VALUE.map(e => e.map(value => ({ value })))
const SDK_FLAT = SDK.flat()
const SDK_HANG = (window.SDK = SDK)
const SDK_LIE = hang2lie()
const SDK_AREA = hang2area()

SDK_FLAT.forEach((item, index) => {
  const value = item.value
  const [H, L] = index2pos(index)
  const [A, a] = index2flex[index]
  const items = [
    ...new Set([...SDK_HANG[H], ...SDK_LIE[L], ...SDK_AREA[A]]),
    // ...new Set([SDK_HANG[H], SDK_LIE[L], SDK_AREA[A]].flat()),
  ]
  Object.assign(item, {
    //另有一个本来的字段value
    maybes: value === 0 ? [...A9start1] : [],
    value,
    maybes: value === 0 ? [...A9start1] : value, //twoInOne
    // H: [H, L],
    // L: [L, H],
    // A: [A, a],
    H,
    L,
    A,
    a,
    index,
    items,
  })
})

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
  function another(group) {
    const values = group.filter(isValue).map(e => e.maybes)
    const maybes = group.filter(isMaybe) //不能 改引用
    maybes.forEach(maybe => {
      maybe.maybes = maybe.maybes.filter(e => !values.includes(e))
    })
  }
}

function level2(group) {
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
setTimeout(() => {
  SDK_AREA[1].filter(isMaybe).reduce(
    (all, now) => {
      now.maybes.forEach(maybe => {
        all[maybe].cell.push(now.a)
        all[maybe].item = now
      })
      return all
    },
    A10.map(e => ({ e, cell: [] }))
  ).ll
})
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

function compute(level = 1) {
  ALL.forEach(basic)
  level >= 2 && ALL.forEach(level2)
}

compute(2) //init
merge(2)
compute(2)
merge(2)
compute(2)
merge(2)
compute(2)
merge(2)
compute(2)
merge(2)
compute(2)
merge(2)
compute(2)
merge(2)
compute(2)
merge(2)
compute(2)
merge(2)
compute(2)
merge(2)

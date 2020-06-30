import { isValue, isMaybe, string2value } from "./debug.js"
export { isValue, isMaybe } from "./debug.js"
const STR =
  "600007001070400000010000500008050307390020015105030800002000030000008090400600008"

console.clear()
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
}
// ;[
//   [2, 1, 6, 0, 8, 0, 9, 5, 7],
//   [7, 8, 9, 0, 1, 0, 0, 0, 3],
//   [5, 4, 0, 2, 9, 7, 0, 1, 6],
//   [6, 7, 0, 0, 3, 5, 0, 9, 4],
//   [4, 0, 8, 9, 6, 1, 7, 0, 5],
//   [9, 5, 0, 0, 4, 2, 0, 6, 8],
//   [1, 6, 0, 4, 2, 8, 0, 3, 9],
//   [0, 9, 4, 0, 5, 0, 0, 0, 2],
//   [3, 2, 5, 0, 7, 0, 4, 8, 1],
// ].map((_, H, A) =>
//   _.map(
//     (_, L) =>
//       A[Math.floor(H / 3) * 3 + Math.floor(L / 3)][(H % 3) * 3 + (L % 3)]
//     //       A.flat()[Math.floor(H / 3) * 27 + Math.floor(L / 3) * 9 + (H % 3) * 3 + (L % 3)]
//   )
// )

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

export const SDK = VALUE.map((e, H) =>
  e.map((value, L) => {
    const index = H * 9 + L
    const [A, a] = index2flex[index]
    return {
      maybes: value === 0 ? [...A9start1] : value,
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
const SDK_LIE = hang2lie()
export const SDK_AREA = hang2area()
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

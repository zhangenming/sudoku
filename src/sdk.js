console.clear()
export const NEEDRESOLVE = "0"
export const A90 = [...Array(9)].map((_, i) => i)
export const A91 = [...Array(9)].map((_, i) => i + 1)

const A81 = [...Array(81)].map((_, i) => i)
const A3 = [...Array(3)].map((_, i) => i)
const STR =
  "810003290067000000900500006000408000604000809000209000700001008000000370053800042"
//手动打孔 增加难度?
const VALUE_4Hang = (window.VALUE_4Hang = string2map() || [
  [2, 1, 6, 0, 8, 0, 9, 5, 7],
  [7, 8, 9, 0, 1, 0, 0, 0, 3],
  [5, 4, 0, 2, 9, 7, 0, 1, 6],
  [6, 7, 0, 0, 3, 5, 0, 9, 4],
  [4, 0, 8, 9, 6, 1, 7, 0, 5],
  [9, 5, 0, 0, 4, 2, 0, 6, 8],
  [1, 6, 0, 4, 2, 8, 0, 3, 9],
  [0, 9, 4, 0, 5, 0, 0, 0, 2],
  [3, 2, 5, 0, 7, 0, 4, 8, 1],
])

export const index2flex = A3.map(y =>
  A3.map(x => A3.map(l => A3.map(r => [l + y * 3, r + x * 3])))
)
  .flat(3)
  .map(e => "" + e)
const AreaNum2AreaItems = A90.map(squre =>
  A90.map(index => {
    return flex2index([squre, index])
  })
)

const VALUE_4Hang_ITEM = (window.sdk = VALUE_4Hang.map(hang =>
  hang
    .map(e => "" + e)
    .map(value => ({
      value,
      maybe: value === NEEDRESOLVE ? [...A91].map(e => "" + e) : [],
    }))
))
export const VALUE_4Hang_ITEM_Flat = VALUE_4Hang_ITEM.flat()
const VALUE_4Lie_ITEM = row2col(VALUE_4Hang_ITEM)
const VALUE_4Area_ITEM = AreaNum2AreaItems.map(area =>
  area.map(index => {
    return VALUE_4Hang_ITEM_Flat[index]
  })
)

export function flex2index([squre, index]) {
  return index2flex.findIndex(e => e === `${squre},${index}`)
}

function row2col(row) {
  return A90.map(x => A90.map(y => row[y][x]))
}

function string2map() {
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

function cacheRunIt(f, iteration) {
  const cache = iteration.map(f)
  return cache
  return x => cache[x] //?
}

function check() {
  let isCorrect = true
  VALUE_4Hang_ITEM.map(group => {
    const all = group.map(item => item.value).filter(e => e !== NEEDRESOLVE)
    if (all.length != [...new Set(all)].length) {
      isCorrect = false
    }
  })
  VALUE_4Lie_ITEM.map(group => {
    const all = group.map(item => item.value).filter(e => e !== NEEDRESOLVE)
    if (all.length != [...new Set(all)].length) {
      isCorrect = false
    }
  })
  VALUE_4Area_ITEM.map(group => {
    const all = group.map(item => item.value).filter(e => e !== NEEDRESOLVE)
    if (all.length != [...new Set(all)].length) {
      isCorrect = false
    }
  })
  !VALUE_4Hang_ITEM_Flat.map(e => e.value).includes("0") &&
    console.log("全部完成")
  console.log("检测结果：", isCorrect)
}
export function merge() {
  VALUE_4Hang_ITEM.map(hang =>
    hang.map(item => {
      if (item.maybe.length === 1) {
        item.value = item.maybe[0]
        item.maybe = []
      }
      if (item.resolveByAdcanceValue) {
        item.value = item.resolveByAdcanceValue
        item.maybe = []
      }
    })
  )
  check()
  AllItem()
  // AllNum()
}
AllItem()
// AllNum()

function RS3(params) {
  // 位置->可能的数  ===>>  数->可能的位置
  //很多数据基于依赖于数组位置, filter的时候位置信息会丢失, 改进数据结构
  VALUE_4Area_ITEM[4].ll.reduce((all, now, i) => {
    now.maybe.map(mb => {
      all[mb] || (all[mb] = [])
      all[mb].push(i)
    })
    return all
  }, {}).ll
  VALUE_4Area_ITEM[4].ll.reduce((all, now, i) => {
    now.maybe.map(mb => {
      all[mb] || (all[mb] = [])
      all[mb].push(i)
    })
    return all
  }, []).ll
  VALUE_4Area_ITEM[4].reduce(
    (all, now, i) => {
      now.maybe.map(mb => {
        all[mb].push(i)
      })
      return all
    },
    [...Array(10)].map(() => [])
  ).ll

  //最开始写的逻辑 第一次map毫无用处 当时为什么写呢 要做这次map

  // VALUE_4Area_ITEM[4].ll
  //   .map((e, index) => {
  //     const mb = e.maybe
  //     const va = e.value
  //     return {
  //       mb,
  //       va,
  //       index,
  //     }
  //   })
  //   .ll.reduce((all, now, index) => {
  //     now.mb.map(n => {
  //       all[n] || (all[n] = [])
  //       all[n].push(index)
  //     })
  //     return all
  //   }, {}).ll
}

function RS(data, way) {
  data.map(way)
}
export function HangNum() {
  RS(VALUE_4Hang_ITEM, resolveForNumAdvance)
}

export function LieNum() {
  RS(VALUE_4Lie_ITEM, resolveForNumAdvance)
}

export function AreaNum() {
  RS(VALUE_4Area_ITEM, resolveForNumAdvance)
}
export function AllNum() {
  AllItem() //基础 依赖于
  RS(
    [...VALUE_4Hang_ITEM, ...VALUE_4Lie_ITEM, ...VALUE_4Area_ITEM],
    resolveForNumAdvance
  )
}

export function HangItem() {
  RS(VALUE_4Hang_ITEM, resolveForItemBase)
}
export function LieItem() {
  RS(VALUE_4Lie_ITEM, resolveForItemBase)
}
export function AreaItem() {
  RS(VALUE_4Area_ITEM, resolveForItemBase)
}
export function AllItem() {
  RS(
    [...VALUE_4Hang_ITEM, ...VALUE_4Lie_ITEM, ...VALUE_4Area_ITEM],
    resolveForItemBase
  )
}

function resolveForNumAdvance(group) {
  group
    .reduce((all, now, index) => {
      now.maybe.map(value => {
        all.push({
          value,
          index,
        })
      })
      return all
    }, [])
    .filter(({ value }, _, arr) => {
      return arr.filter(e => e.value === value).length === 1
    })
    .forEach(({ value, index }) => {
      group[index].resolveByAdcanceValue = value
    })
}

function resolveForItemBase(hang) {
  const hangValue = hang.map(e => e.value).filter(e => e !== NEEDRESOLVE)
  const hangMaybe = hang.map(e => e.maybe).filter(e => e.length > 1)
  //副作用
  hangValue.map(value => deleteGroupMaybeOfAValue(hangMaybe, value))
}
function deleteGroupMaybeOfAValue(arr, value) {
  arr.map(item => deleteMaybe(item, value)) //value是0的话不是已知值不需要排除
}
function deleteMaybe(arr, target) {
  const index = arr.indexOf(target + "")
  if (index === -1) return //没有找到 必须返回, -1给splice会有其他效果
  arr.splice(index, 1) //是否需要可变数组 git管理以防无法复原的bug
  return arr
  //25个Ok 56个todoing
}
export const index2pos = cacheRunIt(i => [i % 9, Math.floor(i / 9)], A81)

export function exports() {
  const text = VALUE_4Hang_ITEM_Flat.map(e => e.value).join("")
  var textarea = document.createElement("textarea")
  var currentFocus = document.activeElement
  document.body.appendChild(textarea)
  textarea.value = text
  textarea.focus()
  if (textarea.setSelectionRange) {
    textarea.setSelectionRange(0, textarea.value.length)
  } else {
    textarea.select()
  }
  try {
    var state = document.execCommand("copy")
  } catch (err) {
    var state = false
  }
  document.body.removeChild(textarea)
  currentFocus.focus()
  return state
}

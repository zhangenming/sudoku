export const NEEDRESOLVE = "0"
export const A90 = [...Array(9)].map((_, i) => i)
export const A91 = [...Array(9)].map((_, i) => i + 1)

const A81 = [...Array(81)].map((_, i) => i)
const A3 = [...Array(3)].map((_, i) => i)
const STR =
  "030000000004701002028600009000317000081094200000000040000800000000060507300005800"
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
  AllNum()
}
export function HangNum() {
  VALUE_4Hang_ITEM.map(resolveForNumAdvance)
}

export function LieNum() {
  VALUE_4Lie_ITEM.map(resolveForNumAdvance)
}

export function AreaNum() {
  VALUE_4Area_ITEM.map(resolveForNumAdvance)
}
export function AllNum() {
  VALUE_4Hang_ITEM.map(resolveForNumAdvance)
  VALUE_4Lie_ITEM.map(resolveForNumAdvance)
  VALUE_4Area_ITEM.map(resolveForNumAdvance)
}

export function HangItem() {
  VALUE_4Hang_ITEM.map(resolveForItemBase)
}
export function LieItem() {
  VALUE_4Lie_ITEM.map(resolveForItemBase)
}
export function AreaItem() {
  VALUE_4Area_ITEM.map(resolveForItemBase)
}
export function AllItem() {
  VALUE_4Hang_ITEM.map(resolveForItemBase)
  VALUE_4Lie_ITEM.map(resolveForItemBase)
  VALUE_4Area_ITEM.map(resolveForItemBase)
}

AllItem()
AllNum()

function resolveForNumAdvance(group) {
  return group
    .map(item => item.maybe)
    .reduce((all, now, index) => {
      now.map(value => {
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
    .map(({ value, index }) => {
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

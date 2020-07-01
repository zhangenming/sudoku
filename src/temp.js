console.clear()
console.time("sdk.js")

function arrayDiff(A, B) {
  return B.filter(e => !A.includes(e))
}
function arrayIntersection(A, B, C) {
  //todo 可变参数
  return [...new Set([...A, ...B, ...C])].filter(
    e => A.includes(e) && B.includes(e) && C.includes(e)
  )
}
export function merge() {
  VALUE_4Hang_ITEM.map(hang =>
    hang.map(item => {
      if (item.maybe.length === 1) {
        item.value = item.maybe[0]
        item.maybe = []
      }
    })
  )
  check()
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
function cacheRunIt(f, iteration) {
  const cache = iteration.map(f)
  return cache
  return x => cache[x] //?
}

export function pos2index([x, y]) {
  return y * 9 + x
}

function row2col(row) {
  return A90.map(x => A90.map(y => row[y][x]))
}
function col2row(col) {
  return A90.map(x => A90.map(y => col[y][x]))
}

export const NEEDRESOLVE = "0"
export const A90 = [...Array(9)].map((_, i) => i)
export const A91 = [...Array(9)].map((_, i) => i + 1)
const A81 = [...Array(81)].map((_, i) => i)
const A3 = [...Array(3)].map((_, i) => i)

export const index2pos = cacheRunIt(i => [i % 9, Math.floor(i / 9)], A81)

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
const STR =
  "010000050200000400040060900092654080060003000835920046000070060020800000400090570"
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
// .map((e) => e.map((e) => "" + e)) //todo with ''
const num2Hang9ItemOfIndex = A90.map(y => A90.map(x => y * 9 + x))
const num2Liee9ItemOfIndex = row2col(num2Hang9ItemOfIndex)

const VALUE81 = VALUE_4Hang.flat()
const index2Value = VALUE81.map(e => "" + e) //todo clear

//index -> index是第几个 块
const index2NumOfArea = cacheRunIt(i => {
  const [x, y] = index2pos[i]
  const rowIndex = Math.floor(y / 3)
  const colIndex = Math.floor(x / 3)
  if (rowIndex === 0 && colIndex === 0) return 0
  if (rowIndex === 0 && colIndex === 1) return 1
  if (rowIndex === 0 && colIndex === 2) return 2
  if (rowIndex === 1 && colIndex === 0) return 3
  if (rowIndex === 1 && colIndex === 1) return 4
  if (rowIndex === 1 && colIndex === 2) return 5
  if (rowIndex === 2 && colIndex === 0) return 6
  if (rowIndex === 2 && colIndex === 1) return 7
  if (rowIndex === 2 && colIndex === 2) return 8
}, A81)
//index -> index是第几个 hang
const index2NumOfHang = i => Math.floor(i / 9)
//index -> index是第几个 lie
const index2NumOfLiee = i => i % 9
//上面两个集合
export const index2flex = A3.map(y =>
  A3.map(x => A3.map(l => A3.map(r => [l + y * 3, r + x * 3])))
)
  .flat(3)
  .map(e => "" + e)

export const flex2index = ([squre, index]) =>
  index2flex.findIndex(e => e === `${squre},${index}`)

const VALUE4Area = (() => {
  const t = [] //todo 不优雅 有办法一个函数实现?
  A81.reduce((all, i) => {
    const [q, w] = index2flex[i].split(",")
    const value = VALUE_4Hang[q][w]
    if (i % 9 === 0) {
      all = []
      t[index2NumOfHang(i)] = all
    }
    all.push(value)
    return all
  }, [])
  return t
})()

// const index2OriginMaybeFunc = (i) => [...index2OriginMaybeArr[i]]
const index2OriginMaybeFunc = i => index2OriginMaybeArr[i]
const index2OriginMaybeArr = VALUE_4Hang.flat()
  .map(e => "" + e)
  .map(e => {
    if (e !== NEEDRESOLVE) return []
    return [...A91].map(e => "" + e)
  })

//功能完全相同 思维混乱 不知道什么时候写的  逻辑也看不懂了
const AreaNum2AreaItems = A90.map(squre =>
  A90.map(index => {
    return flex2index([squre, index])
  })
)
const AreaNum2AreaItemsIndex = A81.reduce(
  (all, i) => {
    const t = index2NumOfArea[i]
    all[t].push(i)
    return all
  },
  [...Array(9)].map(e => []) // [...Array(9)].fill([]) 不能 引用相同
)

const num2Hang9ItemOfMaybe = cacheRunIt(
  n => num2Hang9ItemOfIndex[n].map(index2OriginMaybeFunc),
  A90
)

const num2Liee9ItemOfMaybe = cacheRunIt(
  n => num2Liee9ItemOfIndex[n].map(index2OriginMaybeFunc),
  A90
)
const num2Area9ItemOfMaybe = cacheRunIt(
  n => AreaNum2AreaItems[n].map(index2OriginMaybeFunc),
  A90
)

//格行排除

//格列排除

//格宫排除
function RSGongA() {
  VALUE81.forEach((target, index) => {
    const n = index2NumOfArea[index]
    num2Area9ItemOfMaybe[n].map(e => deleteMaybe(e, target))
  })
}

function getJustOne(arr) {}
//数宫排除https://tieba.baidu.com/p/6327315684?see_lz=1

//数行排除, 基础于格整行, 如果格整行某数字只在一格出现一次,
//那么把此格数字就是她,可以把其他数字排除了

function RSHangB() {
  const n = 1
  num2Hang9ItemOfMaybe[n]
    .reduce(
      (all, now, index) => {
        now.map(e => all[e].push(index))
        return all
      },
      [...Array(10)].map(() => [])
    )
    // .lll("分析完毕, 拿到结果") //可能的数字index -> 可能的格e
    .map((e, index, maybeHang) => {
      //maybe就是num2Hang9ItemOfMaybe[n], 但不能用, 引用变了
      if (e.length === 1) {
        //如果可能的格只有1格, 那么 index 只在e[0] 格
        const item = num2Hang9ItemOfMaybe[n][e[0]]
        item.splice(0, item.length, index + "") //删除所有, 再插入结果
      }
    })
}

//todo 保留一个 通过index适配
const VALUE_4Hang_ITEM = VALUE_4Hang.map(hang =>
  hang
    .map(e => "" + e)
    .map(value => ({
      value,
      maybe: value === NEEDRESOLVE ? [...A91].map(e => "" + e) : [],
    }))
)

export const VALUE_4Hang_ITEM_Flat = VALUE_4Hang_ITEM.flat()
const VALUE_4Lie_ITEM = row2col(VALUE_4Hang_ITEM)

const VALUE_4Area_ITEM = AreaNum2AreaItems.map(area =>
  area.map(index => {
    return VALUE_4Hang_ITEM_Flat[index]
  })
)

function _HangNum() {
  A90.map(n => {
    resolveForItem(num2Hang9ItemOfIndex[n].map(i => VALUE_4Hang_ITEM_Flat[i]))
  })
  // 下面这俩是一个东西
  // num2Hang9ItemOfIndex[0].map(i => VALUE_4Hang_ITEM_Flat[i]).ll
  // VALUE_4Hang_ITEM[0].ll
}

export function HangNum() {
  VALUE_4Hang_ITEM.map(resolveForNum)
}

export function LieNum() {
  VALUE_4Lie_ITEM.map(resolveForNum)
}

export function AreaNum() {
  VALUE_4Area_ITEM.map(resolveForNum)
}
export function AllNum() {
  VALUE_4Hang_ITEM.map(resolveForNum)
  VALUE_4Lie_ITEM.map(resolveForNum)
  VALUE_4Area_ITEM.map(resolveForNum)
}

export function HangItem() {
  VALUE_4Hang_ITEM.map(resolveForItem)
}
export function LieItem() {
  VALUE_4Lie_ITEM.map(resolveForItem)
}
export function AreaItem() {
  VALUE_4Area_ITEM.map(resolveForItem)
}
export function AllItem() {
  VALUE_4Hang_ITEM.map(resolveForItem)
  VALUE_4Lie_ITEM.map(resolveForItem)
  VALUE_4Area_ITEM.map(resolveForItem)
}
function resolveForNum(group) {
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
}

function resolveForItem(hang) {
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

function gene(index) {
  const value = index2Value[index]
  const clsMaybe = VALUE_4Hang_ITEM_Flat[index].maybe.map(e => "m" + e)
  if (clsMaybe.length > 1) {
    var clsItem = "needSolve"
  }
  if (clsMaybe.length === 1) {
    var clsItem = "canSolve"
  }
  if (clsMaybe.length === 0) {
    var clsItem = "hasSolve"
  }

  return {
    value,
    clsMaybe,
    clsItem,
  }
}
//how to let two a90 become a81
export const _arrSUDUKO = A90.map(
  squre => A90.map(index => flex2index([squre, index])).map(gene)
  // squre => A90.map(index => gene(flex2index([squre, index])))
)
export const arrSUDUKO = A90.map(squre =>
  A90.map(index => flex2index([squre, index])).map(
    i => VALUE_4Hang_ITEM_Flat[i]
  )
)

export const funcSUDUKO = ([squre, index]) => {
  const res = VALUE_4Hang_ITEM_Flat[flex2index([squre, index])]
  if (res.maybe.length > 1) {
    res.clsItem = "needSolve"
  }
  if (res.maybe.length === 1) {
    res.clsItem = "canSolve"
  }
  if (res.maybe.length === 0) {
    res.clsItem = "hasSolve"
  }
  res.clsMaybe = res.maybe.map(e => "m" + e)
  return res
}

console.timeEnd("sdk.js")
//数排除 基于格排除？
;[...Array(0)].map(() => {
  VALUE_4Hang_ITEM.map(resolveForItem)
  VALUE_4Lie_ITEM.map(resolveForItem)
  VALUE_4Area_ITEM.map(resolveForItem)
  merge()

  // ;[VALUE_4Hang_ITEM, VALUE_4Lie_ITEM, VALUE_4Area_ITEM].map(e =>
  //   e.map(resolveForItem)
  // )

  // ;[...VALUE_4Hang_ITEM, ...VALUE_4Lie_ITEM, ...VALUE_4Area_ITEM].map(
  //   resolveForItem
  // )
})

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

const index2RES = []

const _index2flex = [
  [0, 0],
  [0, 1],
  [0, 2],
  [1, 0],
  [1, 1],
  [1, 2],
  [2, 0],
  [2, 1],
  [2, 2],
  [0, 0 + 3],
  [0, 1 + 3],
  [0, 2 + 3],
  [1, 0 + 3],
  [1, 1 + 3],
  [1, 2 + 3],
  [2, 0 + 3],
  [2, 1 + 3],
  [2, 2 + 3],
  [0, 0 + 3 * 2],
  [0, 1 + 3 * 2],
  [0, 2 + 3 * 2],
  [1, 0 + 3 * 2],
  [1, 1 + 3 * 2],
  [1, 2 + 3 * 2],
  [2, 0 + 3 * 2],
  [2, 1 + 3 * 2],
  [2, 2 + 3 * 2],
  [0 + 3, 0],
  [0 + 3, 1],
  [0 + 3, 2],
  [1 + 3, 0],
  [1 + 3, 1],
  [1 + 3, 2],
  [2 + 3, 0],
  [2 + 3, 1],
  [2 + 3, 2],
  [0 + 3, 0 + 3],
  [0 + 3, 1 + 3],
  [0 + 3, 2 + 3],
  [1 + 3, 0 + 3],
  [1 + 3, 1 + 3],
  [1 + 3, 2 + 3],
  [2 + 3, 0 + 3],
  [2 + 3, 1 + 3],
  [2 + 3, 2 + 3],
  [0 + 3, 0 + 3 * 2],
  [0 + 3, 1 + 3 * 2],
  [0 + 3, 2 + 3 * 2],
  [1 + 3, 0 + 3 * 2],
  [1 + 3, 1 + 3 * 2],
  [1 + 3, 2 + 3 * 2],
  [2 + 3, 0 + 3 * 2],
  [2 + 3, 1 + 3 * 2],
  [2 + 3, 2 + 3 * 2],
  [0 + 3 * 2, 0],
  [0 + 3 * 2, 1],
  [0 + 3 * 2, 2],
  [1 + 3 * 2, 0],
  [1 + 3 * 2, 1],
  [1 + 3 * 2, 2],
  [2 + 3 * 2, 0],
  [2 + 3 * 2, 1],
  [2 + 3 * 2, 2],
  [0 + 3 * 2, 0 + 3],
  [0 + 3 * 2, 1 + 3],
  [0 + 3 * 2, 2 + 3],
  [1 + 3 * 2, 0 + 3],
  [1 + 3 * 2, 1 + 3],
  [1 + 3 * 2, 2 + 3],
  [2 + 3 * 2, 0 + 3],
  [2 + 3 * 2, 1 + 3],
  [2 + 3 * 2, 2 + 3],
  [0 + 3 * 2, 0 + 3 * 2],
  [0 + 3 * 2, 1 + 3 * 2],
  [0 + 3 * 2, 2 + 3 * 2],
  [1 + 3 * 2, 0 + 3 * 2],
  [1 + 3 * 2, 1 + 3 * 2],
  [1 + 3 * 2, 2 + 3 * 2],
  [2 + 3 * 2, 0 + 3 * 2],
  [2 + 3 * 2, 1 + 3 * 2],
  [2 + 3 * 2, 2 + 3 * 2],
].map(e => "" + e)

export const RES = index2flex.reduce((all, now, index) => {
  const [x, y] = index2pos[index]
  const R = maybeHeng[y]
  const C = maybeShuu[x]
  const A = maybeArea[index2NumOfArea[index]]
  const itemValue = index2Value[index]
  const maybe =
    itemValue === NEEDRESOLVE
      ? arrayIntersection(R, C, A).map(e => "m" + e)
      : []
  //A91

  if (maybe.length > 1) {
    var clsType = "needSolve"
  }
  if (maybe.length === 1) {
    var clsType = "canSolve"
  }
  if (maybe.length === 0) {
    var clsType = "hasSolve"
  }

  const tmp = {
    value: itemValue,
    pos: [y, x],
    maybe,
    clsType,
  }
  all[now] = tmp
  index2RES.push(tmp)
  return all
}, {})

function RSGongB() {
  //静态动态?>
  return AreaNum2AreaItems.map(area => {
    const reslut = area
      .map(i => index2RES[i])
      .reduce((all, now) => {
        now.maybe.map(mb => {
          all[mb] || (all[mb] = [])
          all[mb].push(now)
        })
        return all
      }, {})

    return Object.keys(reslut).reduce((all, key) => {
      if (reslut[key].length === 1) all[key] = reslut[key][0].pos
      return all
    }, {})
  })
}

const maybeHeng = VALUE4ROW.map(e => arrayDiff(e, A91))
const maybeShuu = VALUE4COL.map(e => arrayDiff(e, A91))
const maybeArea = VALUE4Area.map(e => arrayDiff(e, A91))

function arrayDiff(A, B) {
  return B.filter(e => !A.includes(e))
}
function arrayIntersection(A, B, C) {
  //todo 可变参数
  return [...new Set([...A, ...B, ...C])].filter(
    e => A.includes(e) && B.includes(e) && C.includes(e)
  )
}

export function pos2index([x, y]) {
  return y * 9 + x
}

function col2row(col) {
  return A90.map(x => A90.map(y => col[y][x]))
}

function RSGongA() {
  VALUE81.forEach((target, index) => {
    const n = index2NumOfArea[index]
    num2Area9ItemOfMaybe[n].map(e => deleteMaybe(e, target))
  })
}

function RSHangB() {
  const n = 1
  num2Hang9ItemOfMaybe[n]
    .reduce(
      (all, now, index) => {
        now.map(e => all[e].push(index))
        return all
      },
      [...Array(10)].map(() => [])
    )
    // .lll("分析完毕, 拿到结果") //可能的数字index -> 可能的格e
    .map((e, index, maybeHang) => {
      //maybe就是num2Hang9ItemOfMaybe[n], 但不能用, 引用变了
      if (e.length === 1) {
        //如果可能的格只有1格, 那么 index 只在e[0] 格
        const item = num2Hang9ItemOfMaybe[n][e[0]]
        item.splice(0, item.length, index + "") //删除所有, 再插入结果
      }
    })
}

const AreaNum2AreaItemsIndex = A81.reduce(
  (all, i) => {
    const t = index2NumOfArea[i]
    all[t].push(i)
    return all
  },
  [...Array(9)].map(e => []) // [...Array(9)].fill([]) 不能 引用相同
)

const num2Hang9ItemOfMaybe = cacheRunIt(
  n => num2Hang9ItemOfIndex[n].map(index2OriginMaybeFunc),
  A90
)

const num2Liee9ItemOfMaybe = cacheRunIt(
  n => num2Liee9ItemOfIndex[n].map(index2OriginMaybeFunc),
  A90
)
const num2Area9ItemOfMaybe = cacheRunIt(
  n => AreaNum2AreaItems[n].map(index2OriginMaybeFunc),
  A90
)

function _RSLieA() {
  return VALUE81.map((target, index) => {
    const n = index2NumOfLiee(index)
    return num2Liee9ItemOfMaybe[n].map(maybe => {
      deleteMaybe(maybe, target)
      return maybe
    })
  }).filter((_, i) => i < 9)
}

function RSHANGA() {
  VALUE_4Hang.map((hang, hangNum) => {
    hang.map(item =>
      deleteGroupMaybeOfAValue(num2Hang9ItemOfMaybe[hangNum], item)
    )
  })
}

function RSLieA() {
  //拿每列数据
  VALUE_4Lie.map((valueLie, lieNum) => {
    //拿每列可能
    const maybeLie = num2Liee9ItemOfMaybe[lieNum] //这个filter性能应该提升很大
    deleteGroupOfGroup(
      maybeLie.filter(e => e.length > 1), //todo
      valueLie.filter(e => e)
    )
  })
}

function RSHANGA1() {
  A81.forEach(index => {
    const target = VALUE_4Hang.flat()[index]
    if ("" + target === NEEDRESOLVE) return
    const [_, y] = index2pos[index]
    //考虑使用es6+ |>符号
    A90.map(e => [e, y]) //生成目标 这行的pos
      .map(pos2index) //换成index
      .map(index2OriginMaybeFunc)
      //拿到maybe
      .forEach(e => deleteMaybe(e, target)) //减去目标
  })
}

function RSHANGA2() {
  let target
  VALUE81.forEach((t, index) => {
    target = t
    // if ("" + target === NEEDRESOLVE) return //todo
    const n = index2NumOfHang(index)
    // num2Hang9ItemOfMaybe[n].forEach(deleteMaybe)
    num2Hang9ItemOfMaybe[n].forEach(e => deleteMaybe(e, target)) //减去目标
  })
  function _deleteMaybe(arr) {
    const index = arr.indexOf(target + "")
    if (index === -1) return //必须返回, -1给splice会有其他效果
    arr.splice(index, 1) //是否需要可变数组 git管理以防无法复原的bug
    return arr
  }
}

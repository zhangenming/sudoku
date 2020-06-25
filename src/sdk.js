function arrayDiff(A, B = A91) {
  return B.filter((e) => !A.includes(e))
}
function arrayIntersection(A, B, C) {
  //todo
  return [...new Set([...A, ...B, ...C])].filter(
    (e) => A.includes(e) && B.includes(e) && C.includes(e)
  )
}

export const NEEDRESOLVE = "0"
const A90 = [...Array(9)].map((_, i) => i)
const A91 = [...Array(9)].map((_, i) => i + 1)
const A81 = [...Array(81)].map((_, i) => i)

//手动打孔 增加难度?
const VALUE4ROW = (window.VALUE4ROW = [
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

const VALUE4COL = A90.map((col) => A90.map((row) => VALUE4ROW[row][col]))

function index2pos(i) {
  return [i % 9, Math.floor(i / 9)]
}
const index2AreaIndex = (i) => Math.floor(i / 9)

const index2Value = VALUE4ROW.flat().map((e) => "" + e) //todo clear

//index -> index是第几个块
const index2AreaIndexAreaMap = A81.map((i) => {
  const [col, row] = index2pos(i)
  const rowIndex = Math.floor(row / 3)
  const colIndex = Math.floor(col / 3)

  if (rowIndex === 0 && colIndex === 0) return 0
  if (rowIndex === 0 && colIndex === 1) return 1
  if (rowIndex === 0 && colIndex === 2) return 2
  if (rowIndex === 1 && colIndex === 0) return 3
  if (rowIndex === 1 && colIndex === 1) return 4
  if (rowIndex === 1 && colIndex === 2) return 5
  if (rowIndex === 2 && colIndex === 0) return 6
  if (rowIndex === 2 && colIndex === 1) return 7
  if (rowIndex === 2 && colIndex === 2) return 8
})

//全部以index为中介
const index2SqureIndex = [
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
].map((e) => "" + e)

//没有必要使用func缓存  0+
const squreIndex2Index = (squre, index) =>
  index2SqureIndex.findIndex((e) => e === `${squre},${index}`)

const VALUE4Area = (() => {
  const t = [] //todo 不优雅 有办法一个函数实现?
  A81.reduce((all, i) => {
    const [q, w] = index2SqureIndex[i].split(",")
    const value = VALUE4ROW[q][w]
    if (i % 9 === 0) {
      all = []
      t[index2AreaIndex(i)] = all
    }
    all.push(value)
    return all
  }, [])
  return t
})()
//一个是数组, 一个是函数, 一个传index索引, 一个传arg执行, 所以区别?
//一个是实时运行, 但相同执行重复执行会浪费时间, 一个是预先全部执行一遍 ,占用空间
//能外移的外移 避免函数重新执行从而再次执行
const maybeHeng = VALUE4ROW.map((e) => arrayDiff(e))
const maybeShuu = VALUE4COL.map((e) => arrayDiff(e))
const maybeArea = VALUE4Area.map((e) => arrayDiff(e))

// VALUE4ROW.flat().map((e, index) => {
//   ;[e, index]
//   const [row, col] = index2pos(index)
// })
const index2RES = []
export const RES = index2SqureIndex.reduce((all, now, index) => {
  const [x, y] = index2pos(index)
  const R = maybeHeng[y]
  const C = maybeShuu[x]
  const A = maybeArea[index2AreaIndexAreaMap[index]]
  const itemValue = index2Value[index]
  const maybe =
    itemValue === NEEDRESOLVE
      ? arrayIntersection(R, C, A).map((e) => "m" + e)
      : []

  if (maybe.length > 1) {
    var classType = "needSolve"
  }
  if (maybe.length === 1) {
    var classType = "canSolve"
  }
  if (maybe.length === 0) {
    var classType = "hasSolve"
  }

  const tmp = {
    value: itemValue,
    pos: [y, x],
    maybe,
    classType,
  }
  all[now] = tmp
  index2RES.push(tmp)
  return all
}, {})
//现在是进页面就默认执行, 改成点击再执行
//需要深刻理解row,col,1+,0+
//坐标起始点需要搞清楚
//两个问题需要搞清楚 0+/1+? col/row?
let id = 0
export function double3(squre, index, clickSameValue) {
  window.ii++
  // superSuspend(1)
  //缓存 模板执行太多了
  //九宫格坐标1+
  const SOO = RES[`${squre - 1}-${index - 1}`]
  const value = SOO.value
  return {
    value,
    classMaybe: SOO.maybe, //vue class数组必须字符串?,
    classItem: [SOO.classType, { selected: clickSameValue.x === value }],
    id: id++,
  }
}
export function double(squre, index) {
  window.ii++
  // superSuspend(1)
  //缓存 模板执行太多了
  //九宫格坐标1+
  const RES_ = RES[`${squre - 1},${index - 1}`]
  const value = RES_.value
  return {
    value,
    classMaybe: RES_.maybe, //vue class数组必须字符串?,
    classItem: (clickSameValue) => [
      RES_.classType,
      { selected: clickSameValue.x === value },
    ],
  }
}

const AreaIndex = [[]]

function index(index) {}
export const doubleCache = A91.map((squre) =>
  A91.map((index) => double(squre, index))
)

const getAreaItem = A90.map((squre) =>
  A90.map((index) => {
    return squreIndex2Index(squre, index)
  })
)

// 宫排除https://tieba.baidu.com/p/6327315684?see_lz=1
function RSgong() {
  //静态动态?>
  return getAreaItem.map((area) => {
    const reslut = area
      .map((i) => index2RES[i])
      .reduce((all, now) => {
        now.maybe.map((mb) => {
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
RSgong().ll

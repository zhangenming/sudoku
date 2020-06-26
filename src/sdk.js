console.clear()

function arrayDiff(A, B = A91) {
  return B.filter(e => !A.includes(e))
}
function arrayIntersection(A, B, C) {
  //todo 可变参数
  return [...new Set([...A, ...B, ...C])].filter(
    e => A.includes(e) && B.includes(e) && C.includes(e)
  )
}

function cacheRunIt(f, iteration = A81) {
  const cache = iteration.map(f)
  return cache
  return x => cache[x] //?
}

function deleteMaybe(arr, target) {
  const index = arr.indexOf(target + "")
  if (index === -1) return //必须返回, -1给splice会有其他效果
  arr.splice(index, 1) //是否需要可变数组 git管理以防无法复原的bug
  return arr
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

export const index2pos = cacheRunIt(i => [i % 9, Math.floor(i / 9)])

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
// .map((e) => e.map((e) => "" + e)) //todo with ''
const VALUE4COL = row2col(VALUE4ROW)
const num2Hang9ItemOfIndex = A90.map(y => A90.map(x => y * 9 + x))
const num2Liee9ItemOfIndex = row2col(num2Hang9ItemOfIndex)

const VALUE81 = VALUE4ROW.flat()
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
})
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

export const flex2index = ([squre, index]) =>
  index2flex.findIndex(e => e === `${squre},${index}`)

const VALUE4Area = (() => {
  const t = [] //todo 不优雅 有办法一个函数实现?
  A81.reduce((all, i) => {
    const [q, w] = index2flex[i].split(",")
    const value = VALUE4ROW[q][w]
    if (i % 9 === 0) {
      all = []
      t[index2NumOfHang(i)] = all
    }
    all.push(value)
    return all
  }, [])
  return t
})()

//一个是数组, 一个是函数, 一个传index索引, 一个传arg执行, 所以区别?
//一个是实时运行, 但相同执行重复执行会浪费时间, 一个是预先全部执行一遍 ,占用空间
//能外移的外移 避免函数重新执行从而再次执行
const maybeHeng = VALUE4ROW.map(e => arrayDiff(e))
const maybeShuu = VALUE4COL.map(e => arrayDiff(e))
const maybeArea = VALUE4Area.map(e => arrayDiff(e))

const index2RES = []
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

// const index2OriginMaybeFunc = (i) => [...index2OriginMaybeArr[i]]
const index2OriginMaybeFunc = i => index2OriginMaybeArr[i]
const index2OriginMaybeArr = VALUE4ROW.flat()
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
//todo 是否有必要封装这么多层?

//格行排除
function RSHANGA() {
  VALUE81.forEach((target, index) => {
    // if ("" + target === NEEDRESOLVE) return
    const n = index2NumOfHang(index)
    // num2Hang9ItemOfIndex[n].map(index2OriginMaybeFunc)
    num2Hang9ItemOfMaybe[n].forEach(e => deleteMaybe(e, target)) //减去目标
  })
}

//格列排除
function RSLieA() {
  return VALUE81.map((target, index) => {
    const n = index2NumOfLiee(index)
    return num2Liee9ItemOfMaybe[n].map(maybe => {
      deleteMaybe(maybe, target)
      return maybe
    })
  }).filter((_, i) => i < 9)
}
function _RSHANGA() {
  A81.forEach(index => {
    const target = VALUE4ROW.flat()[index]
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

//格宫排除
function RSGongA() {
  VALUE81.forEach((target, index) => {
    const n = index2NumOfArea[index]
    num2Area9ItemOfMaybe[n].map(e => deleteMaybe(e, target))
  })
}

function getJustOne(arr) {}
//数宫排除https://tieba.baidu.com/p/6327315684?see_lz=1
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
//数行排除, 基础于格整行, 如果格整行某数字只在一格出现一次,
//那么把此格数字就是她,可以把其他数字排除了

function RSHangB() {
  const n = 1
  num2Hang9ItemOfMaybe[n].ll
    .reduce(
      (all, now, index) => {
        now.map(e => all[e].push(index))
        return all
      },
      [...Array(10)].map(() => [])
    )
    .lll("分析完毕, 拿到结果") //可能的数字index -> 可能的格e
    .map((e, index, maybeHang) => {
      //maybe就是num2Hang9ItemOfMaybe[n], 但不能用, 引用变了
      if (e.length === 1) {
        //如果可能的格只有1格, 那么 index 只在e[0] 格
        const item = num2Hang9ItemOfMaybe[n][e[0]]
        item.splice(0, item.length, index + "") //删除所有, 再插入结果
      }
    })
}
function gene(index) {
  const value = index2Value[index]
  const classMaybe = index2OriginMaybeArr[index].map(e => "m" + e) //vue class数组必须字符串?,

  // RSLieA() //返回值是什么?
  // RSHANGA()
  // RSGongA()
  // RSHangB()

  if (classMaybe.length > 1) {
    var classType = "needSolve"
  }
  if (classMaybe.length === 1) {
    var classType = "canSolve"
  }
  if (classMaybe.length === 0) {
    var classType = "hasSolve"
  }

  return {
    value,
    classMaybe,
    classItem: clickSameValue => [
      classType,
      { selected: clickSameValue.x === value },
    ],
    classItem: classType,
  }
}
//需要考虑 一些函数的缓存是否有必要

//how to let two a90 become a81
//手动缓存模板 vue不能做吗  有没有这种机制
export const doubleCache = A90.map(squre =>
  A90.map(index => flex2index([squre, index])).map(gene)
)
export const doubleCache1 = A90.map(squre =>
  A90.map(index => gene(flex2index([squre, index])))
)

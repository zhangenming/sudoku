const A = [
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
const FLAT = A.flat()
const f1 = () =>
  A.map((_, H, A) =>
    _.map(
      (_, L) =>
        A.flat()[
          Math.floor(H / 3) * 27 + Math.floor(L / 3) * 9 + (H % 3) * 3 + (L % 3)
        ]
    )
  )
const f2 = () =>
  A.map((_, H, A) =>
    _.map(
      (_, L) =>
        FLAT[
          Math.floor(H / 3) * 27 + Math.floor(L / 3) * 9 + (H % 3) * 3 + (L % 3)
        ]
    )
  )
document.onclick = () => {
  getTheBestTime(f1)
  getTheBestTime(f2)
}
document.onclick()
;[...Array(1)].map(() =>
  A.map((_, H, A) =>
    _.map(
      (_, L) =>
        A.flat()[
          Math.floor(H / 3) * 27 + Math.floor(L / 3) * 9 + (H % 3) * 3 + (L % 3)
        ]
    )
  )
)
;[...Array(100)].map(() =>
  A.map((_, H, A) =>
    _.map(
      (_, L) =>
        A.flat()[
          Math.floor(H / 3) * 27 + Math.floor(L / 3) * 9 + (H % 3) * 3 + (L % 3)
        ]
    )
  )
)

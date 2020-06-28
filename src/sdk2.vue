<template>
  <div class="main">
    <div class="suduko">
      <div class="squre" v-for="S in [0, 1, 2, 3, 4, 5, 6, 7, 8]" :key="S">
        <div
          v-for="I in [0, 1, 2, 3, 4, 5, 6, 7, 8]"
          :justAHack="(SUDUKO = gene([S, I]),0)"
          :class="['item', SUDUKO.clsItem,  {selected:clickValue.clickValue === String(SUDUKO.ItemMayBeValue) && !Array.isArray(SUDUKO.ItemMayBeValue)}]"
          :key="I"
          @click="e=>clickItem(e, clickValue)"
        >
          <span v-if="hasRS(SUDUKO)">{{ SUDUKO.ItemMayBeValue }}</span>
          <div
            v-else
            :class="['maybe', SUDUKO.clsMaybe, {selected:clickValue.clickValue === maybe}]"
            v-for="maybe in ['1', '2', '3', '4', '5', '6', '7', '8', '9']"
            :key="maybe"
          >{{ maybe }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
$canSolveBG: #0ea;
.main {
  .suduko {
    display: flex;
    flex-wrap: wrap;
    width: 420px;
    .squre {
      width: 120px;
      margin: 5px;
      display: flex;
      flex-wrap: wrap;
      // &:hover {
      //   .item {
      //     background: mix(#aae, #fff, 50%);
      //     &.canSolve {
      //       background: mix(#3ee, #fff, 50%);
      //     }
      //     &.needSolve {
      //       background: mix(#aee, #fff, 50%);
      //     }
      //   }
      // }
      .item {
        font-weight: 600;
        width: 40px;
        height: 40px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        background: #eee;
        // transition: all 0.1s;
        &:hover {
          background: #aea !important;
        }
        &.canSolve {
          background: $canSolveBG;
        }
        &.needSolve {
          background: #aee;
        }
        &.selected {
          background: #aea;
        }
        .maybe {
          font-weight: 100;
          font-size: 11px;
          width: 33%;
          height: 33%;
          text-align: center;
          visibility: hidden;
          &.advance {
            background: $canSolveBG;
          }
          &.selected {
            background: #aea;
          }
          &.m1 {
            div &:nth-of-type(1) {
              visibility: inherit;
            }
          }
          &.m2 {
            div &:nth-of-type(2) {
              visibility: inherit;
            }
          }
          &.m3 {
            div &:nth-of-type(3) {
              visibility: inherit;
            }
          }
          &.m4 {
            div &:nth-of-type(4) {
              visibility: inherit;
            }
          }
          &.m5 {
            div &:nth-of-type(5) {
              visibility: inherit;
            }
          }
          &.m6 {
            div &:nth-of-type(6) {
              visibility: inherit;
            }
          }
          &.m7 {
            div &:nth-of-type(7) {
              visibility: inherit;
            }
          }
          &.m8 {
            div &:nth-of-type(8) {
              visibility: inherit;
            }
          }
          &.m9 {
            div &:nth-of-type(9) {
              visibility: inherit;
            }
          }
        }
      }
    }
  }
  .shortcut {
    display: flex;
    margin: 0 auto;
    background: #eee;
    justify-content: space-evenly;
    flex-direction: row;
    div {
      padding: 15px;
      margin: 2px;
    }
    .selected {
      background: #aea;
    }
  }
  .control {
    button {
      margin: 5px;
    }
  }
}
</style>
<script>
import { reactive, ref, watchEffect, watch } from "vue"
import { SDK_AREA, hasRS, needRS } from "./sdk2.js"
export default {
  setup() {
    const SUDUKO = ref()
    const clickValue = reactive({ clickValue: "" })
    return { gene, hasRS, clickItem, clickValue }
  }
}

function gene([S, I]) {
  // "x".ll
  const item = SDK_AREA[S][I]
  const ItemMayBeValue = item.ItemMayBeValue
  let clsItem = "hasSolve"
  if (needRS(item)) {
    clsItem = ItemMayBeValue.length == 1 ? "canSolve" : "needSolve"
  }
  return {
    ItemMayBeValue,
    clsItem,
    clsMaybe: needRS(item) && ItemMayBeValue.map(e => "m" + e)
  }
}
function clickItem(e, clickValue) {
  if (e.currentTarget.classList.contains("hasSolve")) {
    clickValue.clickValue = e.currentTarget.innerText
  } else {
    clickValue.clickValue = ""
  }
  // const flex = [S, I].ll
  // const index = flex2index(flex).ll
  // index2pos[index].ll
}
// if (0) asas//不报错??

//全部以index为中介
// 行格排除  行数排除
// 数排除  数确定只能在某个格
// 格排除  这个格只能填这个数

//缓存 模板执行太多了

//考虑使用es6+ |>符号
//todo 是否有必要封装这么多层?

//todo 引号问题

//自动循环执行排除  直到执行结果没有新排除单元

//可以缓存的根本原因是参数有限固定, 预先执行
//需要考虑 一些函数的缓存是否有必要
//手动缓存模板 vue不能做吗  有没有这种机制
//考虑底层不缓存  最上层抽象
//现在的策略是把所有函数缓存一边,感觉没必要, 1根据性能,2顶层缓存,下层不变无感

//计算函数执行次数 寻找可以空间换时间函数  比较两次策略性能
//todo value 和maybevalue是一个值  互斥

//一个是数组, 一个是函数, 一个传index索引, 一个传arg执行, 所以区别?
//一个是实时运行, 但相同执行重复执行会浪费时间, 一个是预先全部执行一遍 ,占用空间
//能外移的外移 避免函数重新执行从而再次执行

//坐标起始点需要搞清楚
//需要深刻理解row,col,1+,0+
//2个问题需要搞清楚 0+/1+?  ''?
</script>

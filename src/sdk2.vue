<template>
  <div class="main">
    <div class="suduko" v-if="1">
      <!-- todo 三层vfor嵌套优化成三层组件嵌套? -->
      <div class="squre" v-for="S in [0, 1, 2, 3, 4, 5, 6, 7, 8]" :key="S">
        <div
          v-for="I in [0, 1, 2, 3, 4, 5, 6, 7, 8]"
          :justAHack="(SDKItem = gene([S, I]),'')"
          :class="[
            'item',
            SDKItem.clsItem,
            {
              selected:
                clickValue.clickValue === String(SDKItem.maybes) &&
                !Array.isArray(SDKItem.maybes),
            },
          ]"
          :key="I"
          @click="e => clickItem(e, clickValue)"
        >
          <!-- todo 下面两个dom结构优化合成一个 vfor, 如果是isValue, css控制提升 -->
          <span v-if="isValue(SDKItem)">{{ SDKItem.maybes }}</span>
          <div
            v-else
            :class="[
              'maybe',
              SDKItem.clsMaybe,
              { selected: clickValue.clickValue === maybe },
              {canSolve:maybe === String(SDKItem.l2)}
            ]"
            v-for="maybe in ['1', '2', '3', '4', '5', '6', '7', '8', '9']"
            :key="maybe"
          >{{ maybe }}</div>
        </div>
      </div>
    </div>
  </div>
  <!-- https://zhuanlan.zhihu.com/p/64627216 -->
  <!-- https://juejin.im/post/5da757e35188255393130f89 -->
</template>

<style lang="scss">
$canSolveBG: #00bfff;
$selected: #ff7f50;
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
          background: $selected !important;
          .maybe {
            background: $selected;
          }
        }
        &.canSolve,
        & .canSolve {
          background: $canSolveBG;
        }
        &.needSolve {
          background: #aee;
        }
        &.selected {
          background: $selected;
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
            background: $selected;
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
import { SDK_AREA } from "./sdk2.js"
import { isValue, isMaybe } from "./debug.js"
export default {
  setup() {
    const SDKItem = ref()
    const clickValue = reactive({ clickValue: "" })
    return { gene, isValue, clickItem, clickValue }
  }
}

function gene([S, I]) {
  // "x".ll
  const item = SDK_AREA[S][I]
  const maybes = item.maybes
  let clsItem = "hasSolve"
  const isMb = isMaybe(item)
  if (isMb) {
    clsItem = maybes.length == 1 ? "canSolve" : "needSolve"
  }
  return {
    maybes,
    clsItem,
    clsMaybe: isMb && maybes.map(e => "m" + e),
    l2: item.l2
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

//arr cache是预加载, func是懒执行

//坐标起始点需要搞清楚
//需要深刻理解row,col,1+,0+
//2个问题需要搞清楚 0+/1+?  ''?

//吃惊 就这?  这就完了?  我3天 72小时就写了点这???
//第一次有这种体验  是原来的代码太差吗?  有时间了重写看看之前的代码 理清楚思路
//重写的过程中以及结束后为什么没有遇到字符串转换问题 包括row/col;x/y;hang/lie问题; 数组起点0+/1+问题
//数组结构丢失位置信息

// 基本值的求值思路
// 1,遍历所有的已知格, 排除未知格里的值
// 2,遍历所有的未知格，用附近已知格排除自己格里的值
// 哪个性能好 ?
</script>

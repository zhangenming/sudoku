<template>
  <div>
    <div class="main">
      <div class="S" v-for="S in A90" :key="S">
        <div
          class="item"
          @mouseover="itemMouse"
          @click="itemClick(S,I)"
          v-for="I in A90"
          :class="[ XX[S][I].classItem, hoverValue.x === XX[S][I].value && 'selected' ]"
          :key="I"
        >
          <span v-if="XX[S][I].value !== NEEDRESOLVE">{{XX[S][I].value}}</span>
          <div
            class="maybe"
            v-else
            v-for="maybe in A91"
            :class="[ XX[S][I].classMaybe,  hoverValue.x === ''+maybe && 'selected']"
            :key="maybe"
          >{{maybe}}</div>
        </div>
      </div>
    </div>

    <div class="main">
      <div class="S" v-for="S in A90" :key="S">
        <div class="item" v-for="I in A90" :key="I">
          <span>{{S}}{{I}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

  <!-- {{eval('debugger') /*a way for debug*/}} -->
        <!--         
        :classs="double3(S, I, hoverValue).classItem"
        :classss="double(S, I, ).classItem(hoverValue)"
        :classx="doubles(S, I, ).classItem"-->

        <!-- <no style="display:none">{{dbg = double(S, I,)}}</no> -->
       
<style lang="scss" >
.main {
  display: flex;
  flex-wrap: wrap;
  width: 420px;
  .S {
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
      width: 40px;
      height: 40px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      background: #eee;
      // transition: all 0.1s;
      &:hover,
      &.canSolve:hover,
      &.needSolve:hover {
        background: #aea;
      }
      &.canSolve {
        background: #3ee;
      }
      &.needSolve {
        background: #aee;
      }
      &.selected {
        background: #aea;
      }
      .maybe {
        font-size: 11px;
        width: 33%;
        height: 33%;
        text-align: center;
        visibility: hidden;
        &.selected {
          background: #aea;
        }
        &.m1 {
          &:nth-of-type(1) {
            visibility: inherit;
          }
        }
        &.m2 {
          &:nth-of-type(2) {
            visibility: inherit;
          }
        }
        &.m3 {
          &:nth-of-type(3) {
            visibility: inherit;
          }
        }
        &.m4 {
          &:nth-of-type(4) {
            visibility: inherit;
          }
        }
        &.m5 {
          &:nth-of-type(5) {
            visibility: inherit;
          }
        }
        &.m6 {
          &:nth-of-type(6) {
            visibility: inherit;
          }
        }
        &.m7 {
          &:nth-of-type(7) {
            visibility: inherit;
          }
        }
        &.m8 {
          &:nth-of-type(8) {
            visibility: inherit;
          }
        }
        &.m9 {
          &:nth-of-type(9) {
            visibility: inherit;
          }
        }
      }
    }
  }
}
</style>
<script>
import { reactive, ref } from "vue";
import {
  NEEDRESOLVE,
  doubleCache as XX,
  RES,
  A90,
  A91,
  pos2index,
  flex2index,
  index2flex,
  index2pos
} from "./sdk.js";
function superSuspend(n) {
  const q = Date.now();
  while (Date.now() - q < n) {}
}

export default {
  setup() {
    let hoverValue = reactive({ x: "" });
    let dbg = ref(2222);
    let tmp = reactive(2);
    const r = ref(2);
    return {
      XX,
      A90,
      A91,
      NEEDRESOLVE,
      itemMouse,
      hoverValue,
      tmp,
      r,
      dbg,
      eval,
      log: console.log,
      itemClick
    };

    function itemMouse(e) {
      let x;
      if (e.currentTarget.classList.contains("hasSolve")) {
        x = e.currentTarget.innerText;
      } else {
        x = "";
      }
      // r.value = tmp = hoverValue.x = x;
    }
    function itemClick(S, I) {
      const flex = [S, I].ll;
      const index = flex2index(flex).ll;
      index2pos[index].ll;
    }
  }
};

//计算函数执行次数 寻找可以空间换时间函数  比较两次策略性能
//手动打孔 增加难度?
const tttt = [
  [2, 0, 0, 0, 0, 0, 0, 0, 0],
  [7, 0, 0, 0, 0, 0, 0, 0, 0],
  [5, 0, 0, 0, 0, 0, 0, 0, 0],
  [6, 0, 0, 0, 0, 0, 0, 0, 0],
  [4, 0, 0, 0, 0, 0, 0, 0, 0],
  [9, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [3, 0, 0, 0, 0, 0, 0, 0, 0]
];

// if (0) asas//不报错??

//全部以index为中介

//缓存 模板执行太多了
// 行格排除  行数排除
// 数排除  数确定只能在某个格
// 格排除  这个格只能填这个数

//可以缓存的根本原因是参数有限固定, 预先执行
//考虑底层不缓存  最上层抽象
//考虑使用es6+ |>符号
</script>


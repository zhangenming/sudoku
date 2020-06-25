<template>
  <div>
    <div class="main">
      <div class="squre" v-for="squre in 9" :key="squre">
        <div
          @mouseover="itemClick"
          class="item"
          v-for="index in 9"
          :class="doubleCache[squre-1][index-1].classItem(clickSameValue)"
          :key="index"
        >
          <span
            v-if="doubleCache[squre-1][index-1].value !== NEEDRESOLVE"
          >{{doubleCache[squre-1][index-1].value}}</span>
          <div
            class="maybe"
            v-else
            v-for="maybe in 9"
            :class="doubleCache[squre-1][index-1].classMaybe"
            :key="maybe"
          >{{maybe}}</div>
        </div>
      </div>
    </div>

    <div class="main">
      <div class="squre" v-for="squre in 9" :key="squre">
        <div class="item" v-for="index in 9" :key="index">
          <span>{{squre-1}}{{index-1}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

  <!-- {{eval('debugger') /*a way for debug*/}} -->
        <!--         
        :classs="double3(squre, index, clickSameValue).classItem"
        :classss="double(squre, index, ).classItem(clickSameValue)"
        :classx="doubles(squre, index, ).classItem"-->

        <!-- <no style="display:none">{{dbg = double(squre, index,)}}</no> -->
       
<style lang="scss" >
.main {
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
      width: 40px;
      height: 40px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      background: #eee;
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
        text-align: center;
        visibility: hidden;
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
import { NEEDRESOLVE, double, doubleCache, double3, RES } from "./sdk.js";
function superSuspend(n) {
  const q = Date.now();
  while (Date.now() - q < n) {}
}
// window.ii = 0;
// setTimeout(() => {
//   window.ii.ll / 81;
// }, 99);
export default {
  setup() {
    let clickSameValue = reactive({ x: 2 });
    let dbg = ref(1213);
    let tmp = reactive(2);
    const r = ref(2);
    return {
      double,
      doubles,
      double3,
      doubleCache,
      NEEDRESOLVE,
      itemClick,
      clickSameValue,
      tmp,
      r,
      dbg,
      eval,
      log: console.log
    };

    function doubles(squre, index) {
      window.ii++;
      // superSuspend(1)
      //缓存 模板执行太多了
      //九宫格坐标1+
      const SOO = RES[`${squre - 1}-${index - 1}`];
      const value = SOO.value;
      return {
        value,
        classMaybe: SOO.maybe, //vue class数组必须字符串?,
        classItem: [SOO.classType, { selected: clickSameValue.x === value }]
      };
    }

    function itemClick(e) {
      let x;
      if (e.currentTarget.classList.contains("hasSolve")) {
        x = e.currentTarget.innerText;
      } else {
        x = "";
      }
      r.value = tmp = clickSameValue.x = x;
    }
  }
};
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
</script>
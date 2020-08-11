<template>
  <div class="lottery flexv flex-between" v-cloak>
    <div class="flexh flex-between tab">
      <div
        v-for="(item, index) in tabList"
        :key="item.id"
        class="lottery__tab-item"
        :class="{ 'lottery__tab-item--active': tab === index }"
        @click="choose(index)"
      >
        {{ item.name }}
      </div>
    </div>

    <div class="PL16 MT16">红球号码投注</div>
    <div class="flexh flex-wrap flex0">
      <div
        class="lottery__red-ball"
        :key="item"
        :class="{ 'lottery__red-ball--active': select.selectRedBall.includes(item) }"
        v-for="item in select.redBallPoll"
        @click="chooseRedBall(item)"
      >
        {{ item }}
      </div>
    </div>

    <div class="PL16 MT16">蓝球号码投注</div>
    <div class="flexh flex-wrap flex0">
      <div
        :key="item"
        class="lottery__blue-ball"
        :class="{ 'lottery__blue-ball--active': select.selectBlueBall.includes(item) }"
        v-for="item in select.blueBallPoll"
        @click="chooseBlueBall(item)"
      >
        {{ item }}
      </div>
    </div>

    <div class="lottery__footer flexh flex-between flex-hcenter">
      <div>
        <div>
          总计： <span class="red">{{ select.notes }}</span> 注
        </div>
        共需要：<span class="red">{{ money }}</span> 元
      </div>
      <div @click="resetSelect">清空</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import createLottery from './lottery'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CreateLottery = createLottery as any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BigInt = (window as any).BigInt

@Component
export default class Lottery extends Vue {
  tab = 0
  select: LotteryConfig = {
    notes: '0',
    name: '',
    id: 0,
    en: '',
    selectRedBall: [],
    selectBlueBall: [],
    redBallPollNum: 0,
    minRedBallNum: 0,
    minBlueBallNum: 0,
    blueBallPollNum: 0,
    redBallPoll: [],
    blueBallPoll: []
    // chooseRedBall: () => {},
    // chooseBlueBall: () => {},
    // getNotes: () => {},
    // resetSelect: () => {}
  }
  tabList: LotteryConfig[] = []

  get money() {
    // eslint-disable-next-line no-undef
    return (BigInt(this.select.notes) * BigInt(2)).toString()
  }

  created() {
    const res = [
      {
        name: '双色球',
        en: 'DoubleColorBallLottery',
        id: 1,
        minRedBallNum: 6,
        redBallPollNum: 33,
        minBlueBallNum: 1,
        blueBallPollNum: 16
      },
      {
        name: '大乐透',
        id: 2,
        en: 'SuperLottery',
        minRedBallNum: 5,
        redBallPollNum: 35,
        minBlueBallNum: 2,
        blueBallPollNum: 12
      }
    ]
    res.map((item: LotteryOption) => {
      this.tabList.push(new CreateLottery(item))
    })
    this.select = this.tabList[0]
  }
  choose(type: number) {
    this.tab = type
    this.select = this.tabList[type]
  }
  chooseRedBall(ball: number) {
    this.select.chooseRedBall(ball)
  }
  chooseBlueBall(ball: number) {
    this.select.chooseBlueBall(ball)
  }
  resetSelect() {
    this.select.resetSelect()
  }
}
</script>

<style scoped lang="scss">
.lottery {
  height: 100vh;

  &__tab-item {
    background-color: #eee;
    line-height: 50px;
    text-align: center;
    width: 50%;

    &--active {
      background-color: red;
      color: #fff;
    }
  }

  &__red-ball {
    border: 1px solid red;
    border-radius: 50%;
    box-sizing: border-box;
    color: red;
    line-height: 50px;
    margin: 16px;
    text-align: center;
    width: 50px;

    &--active {
      background-color: red;
      color: #fff;
    }
  }

  &__blue-ball {
    border: 1px solid blue;
    border-radius: 50%;
    box-sizing: border-box;
    color: blue;
    line-height: 50px;
    margin: 16px;
    text-align: center;
    width: 50px;

    &--active {
      background-color: blue;
      color: #fff;
    }
  }

  &__footer {
    background-color: #eee;
    padding: 16px;
  }
}
</style>

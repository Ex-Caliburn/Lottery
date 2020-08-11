/** 彩票配置*/
interface LotteryConfig {
  name: string
  id: number
  notes: string
  en: string
  minRedBallNum: number
  redBallPollNum: number
  minBlueBallNum: number
  blueBallPollNum: number
  selectRedBall: number[]
  selectBlueBall: number[]
  redBallPoll: number[]
  blueBallPoll: number[]
  chooseRedBall ?: any
  chooseBlueBall ?: any
  getNotes?: any
  resetSelect?: any
}

/** 彩票参数*/
interface LotteryOption {
  minRedBallNum: number
  redBallPollNum: number
  minBlueBallNum: number
  blueBallPollNum: number
}

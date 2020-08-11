// eslint-disable-next-line
function Lottery() {}

Lottery.prototype = {
  createPool(length: number) {
    return Array.from({ length }, (_item, index) => index + 1)
  },
  getNotes() {
    if (
      this.selectRedBall.length < this.minRedBallNum ||
      this.selectBlueBall.length < this.minBlueBallNum
    ) {
      return '0'
    }
    return (
      this.randomDraw(this.selectRedBall.length, this.minRedBallNum) *
      this.randomDraw(this.selectBlueBall.length, this.minBlueBallNum)
    ).toString()
  },
  randomDraw(num: number, min: number) {
    if (min <= 0) {
      return BigInt(0)
    }
    return this.factorial(num) / (this.factorial(min) * this.factorial(num - min))
  },
  factorial(i: number, total = 1) {
    if (i <= 1) return BigInt(total)
    return this.factorial(i - 1, BigInt(total) * BigInt(i))
  },
  chooseRedBall(ball: number) {
    const index = this.selectRedBall.findIndex((item: number) => ball === item)
    if (index > -1) {
      this.selectRedBall.splice(index, 1)
    } else {
      this.selectRedBall.push(ball)
    }
    this.notes = this.getNotes()
  },
  chooseBlueBall(ball: number) {
    const index = this.selectBlueBall.findIndex((item: number) => ball === item)
    if (index > -1) {
      this.selectBlueBall.splice(index, 1)
    } else {
      this.selectBlueBall.push(ball)
    }
    this.notes = this.getNotes()
  },
  resetSelect() {
    this.notes = '0'
    this.selectRedBall = []
    this.selectBlueBall = []
  }
}

// eslint-disable-next-line
function createLottery(this: any, option: LotteryOption): void {
  Lottery.call(this)
  this.notes = '0'
  this.selectRedBall = []
  this.selectBlueBall = []
  Object.assign(this, option)
  // this.redBallPollNum = redBallPollNum
  // this.minRedBallNum = minRedBallNum
  // this.minBlueBallNum = minBlueBallNum
  // this.blueBallPollNum = blueBallPollNum
  this.redBallPoll = this.createPool(this.redBallPollNum)
  this.blueBallPoll = this.createPool(this.blueBallPollNum)
}

createLottery.prototype = Object.create(Lottery.prototype)
createLottery.prototype.construct = createLottery

export default createLottery

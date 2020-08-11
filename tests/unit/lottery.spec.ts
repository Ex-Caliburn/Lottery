import { expect } from 'chai'
import createLottery from '@/views/lottery/lottery'
const CreateLottery = createLottery as any

describe('lottery', () => {
  let newLottery: any
  beforeEach(function() {
    const option = {
      minRedBallNum: 6,
      redBallPollNum: 33,
      minBlueBallNum: 1,
      blueBallPollNum: 16
    }
    newLottery = new CreateLottery(option)
  })
  afterEach(function() {
    expect(newLottery.minRedBallNum).to.equal(6)
    expect(newLottery.redBallPollNum).to.equal(33)
    expect(newLottery.minBlueBallNum).to.equal(1)
    expect(newLottery.blueBallPollNum).to.equal(16)
  })

  it('create lottery', () => {
    expect(newLottery.notes).to.equal('0')
    expect(newLottery.selectBlueBall).to.have.lengthOf(0)
    expect(newLottery.selectRedBall).to.have.lengthOf(0)
    expect(newLottery.redBallPoll).to.include.members([
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33
    ])
    expect(newLottery.blueBallPoll).to.include.members([
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16
    ])
  })

  it('choose one red ball', () => {
    newLottery.chooseRedBall(1)
    expect(newLottery.selectRedBall).to.have.lengthOf(1)
    expect(newLottery.selectRedBall[0]).to.equal(1)
    expect(newLottery.notes).to.equal('0')
  })

  it('choose red ball twice is cancel', () => {
    newLottery.chooseRedBall(1)
    newLottery.chooseRedBall(1)
    expect(newLottery.selectRedBall).to.have.lengthOf(0)
    expect(newLottery.notes).to.equal('0')
  })

  it('choose one blue ball', () => {
    newLottery.chooseBlueBall(1)
    expect(newLottery.selectBlueBall).to.have.lengthOf(1)
    expect(newLottery.selectBlueBall[0]).to.equal(1)
    expect(newLottery.notes).to.equal('0')
  })

  it('choose blue ball twice is cancel', () => {
    newLottery.chooseBlueBall(1)
    newLottery.chooseBlueBall(1)
    expect(newLottery.selectBlueBall).to.have.lengthOf(0)
    expect(newLottery.notes).to.equal('0')
  })

  it('choose five six red ball', () => {
    newLottery.chooseRedBall(1)
    newLottery.chooseRedBall(2)
    newLottery.chooseRedBall(3)
    newLottery.chooseRedBall(4)
    newLottery.chooseRedBall(5)
    newLottery.chooseRedBall(6)
    expect(newLottery.selectBlueBall).to.have.lengthOf(0)
    expect(newLottery.selectRedBall).to.have.lengthOf(6)
    expect(newLottery.selectRedBall).to.include.members([1, 2, 3, 4, 5, 6])
    expect(newLottery.notes).to.equal('0')
  })

  it('choose five six blue ball', () => {
    newLottery.chooseBlueBall(1)
    newLottery.chooseBlueBall(2)
    newLottery.chooseBlueBall(3)
    newLottery.chooseBlueBall(4)
    newLottery.chooseBlueBall(5)
    newLottery.chooseBlueBall(6)
    expect(newLottery.selectRedBall).to.have.lengthOf(0)
    expect(newLottery.selectBlueBall).to.have.lengthOf(6)
    expect(newLottery.selectBlueBall).to.include.members([1, 2, 3, 4, 5, 6])
    expect(newLottery.notes).to.equal('0')
  })

  it('choose five red ball, one blue ball', () => {
    newLottery.chooseBlueBall(1)
    newLottery.chooseRedBall(1)
    newLottery.chooseRedBall(2)
    newLottery.chooseRedBall(3)
    newLottery.chooseRedBall(4)
    newLottery.chooseRedBall(5)
    expect(newLottery.selectBlueBall).to.have.lengthOf(1)
    expect(newLottery.selectBlueBall).to.include.members([1])
    expect(newLottery.selectRedBall).to.have.lengthOf(5)
    expect(newLottery.selectRedBall).to.include.members([1, 2, 3, 4, 5])
    expect(newLottery.notes).to.equal('0')
  })

  it('choose five red ball, one blue ball', () => {
    newLottery.chooseRedBall(1)
    newLottery.chooseBlueBall(1)
    newLottery.chooseBlueBall(2)
    newLottery.chooseBlueBall(3)
    newLottery.chooseBlueBall(4)
    newLottery.chooseBlueBall(5)
    expect(newLottery.selectRedBall).to.have.lengthOf(1)
    expect(newLottery.selectRedBall).to.include.members([1])
    expect(newLottery.selectBlueBall).to.have.lengthOf(5)
    expect(newLottery.selectBlueBall).to.include.members([1, 2, 3, 4, 5])
    expect(newLottery.notes).to.equal('0')
  })

  it('choose six red ball, one blue ball', () => {
    newLottery.chooseBlueBall(1)
    newLottery.chooseRedBall(1)
    newLottery.chooseRedBall(2)
    newLottery.chooseRedBall(3)
    newLottery.chooseRedBall(4)
    newLottery.chooseRedBall(5)
    newLottery.chooseRedBall(6)
    expect(newLottery.selectBlueBall).to.have.lengthOf(1)
    expect(newLottery.selectBlueBall).to.include.members([1])
    expect(newLottery.selectRedBall).to.have.lengthOf(6)
    expect(newLottery.selectRedBall).to.include.members([1, 2, 3, 4, 5, 6])
    expect(newLottery.notes).to.equal('1')
  })

  it('choose all red ball, all blue ball', () => {
    for (let i = 1; i <= 33; i++) {
      newLottery.chooseRedBall(i)
    }
    for (let j = 1; j <= 16; j++) {
      newLottery.chooseBlueBall(j)
    }
    expect(newLottery.selectRedBall).to.have.lengthOf(33)
    expect(newLottery.selectBlueBall).to.have.lengthOf(16)
    expect(newLottery.redBallPoll).to.include.members([
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31,
      32,
      33
    ])
    expect(newLottery.blueBallPoll).to.include.members([
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16
    ])
    expect(newLottery.notes).to.equal('17721088')
  })

  it('reset select', () => {
    newLottery.resetSelect()
    expect(newLottery.notes).to.equal('0')
    expect(newLottery.selectRedBall).to.have.lengthOf(0)
    expect(newLottery.selectBlueBall).to.have.lengthOf(0)
  })
})

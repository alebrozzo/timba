import { describe, expect, it } from "vitest"
import type { DieType } from "$lib/types"
import { onRollCompleted, type SelectableDice } from "../10000"

describe("onRollCompleted", () => {
  function getDieType(): DieType {
    return {
      count: 1,
      faces: 6,
      name: "",
    }
  }

  it("on no roll returns no selectable dice", () => {
    expect(onRollCompleted([])).toEqual([])
  })
  ;[
    [
      { dieType: getDieType(), dieIndex: 0, value: 2 },
      { dieType: getDieType(), dieIndex: 1, value: 3 },
      { dieType: getDieType(), dieIndex: 2, value: 2 },
      { dieType: getDieType(), dieIndex: 3, value: 3 },
      { dieType: getDieType(), dieIndex: 4, value: 4 },
    ],
    [
      { dieType: getDieType(), dieIndex: 0, value: 2 },
      { dieType: getDieType(), dieIndex: 4, value: 4 },
    ],
    [{ dieType: getDieType(), dieIndex: 3, value: 3 }],
  ].forEach((rollResult) => {
    it("on rolls with nothing selectable returns no selectable dice", () => {
      expect(onRollCompleted(rollResult)).toEqual([])
    })
  })

  it("on roll with 1s and 5s returns selectable dice - 1", () => {
    const rollResult = [
      { dieType: getDieType(), dieIndex: 0, value: 1 },
      { dieType: getDieType(), dieIndex: 1, value: 2 },
      { dieType: getDieType(), dieIndex: 2, value: 3 },
      { dieType: getDieType(), dieIndex: 3, value: 4 },
      { dieType: getDieType(), dieIndex: 4, value: 5 },
    ]
    const selectableDice = onRollCompleted(rollResult)
    validateResultsMatchExpected([0, 4], selectableDice)
  })

  it("on roll with 1s and 5s returns selectable dice - 2", () => {
    const rollResult = [
      { dieType: getDieType(), dieIndex: 1, value: 2 },
      { dieType: getDieType(), dieIndex: 3, value: 5 },
    ]
    const selectableDice = onRollCompleted(rollResult)
    validateResultsMatchExpected([3], selectableDice)
  })

  it("on roll with 1s and 5s returns selectable dice - 3", () => {
    const rollResult = [{ dieType: getDieType(), dieIndex: 4, value: 1 }]
    const selectableDice = onRollCompleted(rollResult)
    validateResultsMatchExpected([4], selectableDice)
  })

  it("on roll with 3 of a kind returns selectable dice - 1", () => {
    const rollResult = [
      { dieType: getDieType(), dieIndex: 0, value: 2 },
      { dieType: getDieType(), dieIndex: 1, value: 3 },
      { dieType: getDieType(), dieIndex: 2, value: 2 },
      { dieType: getDieType(), dieIndex: 3, value: 3 },
      { dieType: getDieType(), dieIndex: 4, value: 3 },
    ]
    const selectableDice = onRollCompleted(rollResult)
    validateResultsMatchExpected([1, 3, 4], selectableDice)
  })

  it("on roll with 3 of a kind returns selectable dice - 2", () => {
    const rollResult = [
      { dieType: getDieType(), dieIndex: 0, value: 3 },
      { dieType: getDieType(), dieIndex: 1, value: 3 },
      { dieType: getDieType(), dieIndex: 2, value: 2 },
      { dieType: getDieType(), dieIndex: 3, value: 3 },
      { dieType: getDieType(), dieIndex: 4, value: 3 },
    ]
    const selectableDice = onRollCompleted(rollResult)
    validateResultsMatchExpected([0, 1, 3, 4], selectableDice)
  })

  it("on roll with 3 of a kind returns selectable dice - 3", () => {
    const rollResult = [
      { dieType: getDieType(), dieIndex: 0, value: 5 },
      { dieType: getDieType(), dieIndex: 3, value: 5 },
      { dieType: getDieType(), dieIndex: 4, value: 5 },
    ]
    const selectableDice = onRollCompleted(rollResult)
    validateResultsMatchExpected([0, 3, 4], selectableDice)
  })

  it("on roll with 3+ of a kind returns selectable dice - 4", () => {
    const rollResult = [
      { dieType: getDieType(), dieIndex: 0, value: 1 },
      { dieType: getDieType(), dieIndex: 1, value: 1 },
      { dieType: getDieType(), dieIndex: 2, value: 1 },
      { dieType: getDieType(), dieIndex: 3, value: 1 },
      { dieType: getDieType(), dieIndex: 4, value: 1 },
    ]
    const selectableDice = onRollCompleted(rollResult)
    validateResultsMatchExpected([0, 1, 2, 3, 4], selectableDice)
  })
})

function validateResultsMatchExpected(expectedIxs: number[], value: SelectableDice): void {
  expect(expectedIxs.length).toEqual(value.length)
  const resultIndexes = value.map((dieResult) => dieResult.dieIndex)
  expectedIxs.forEach((ix) => expect(resultIndexes).contain(ix))
}

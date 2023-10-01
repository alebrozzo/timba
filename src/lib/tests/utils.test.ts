import { ErrorCode, type DiceSet } from "$lib/types"
import { validateNewDiceSet } from "$lib/utils"
import { describe, it, expect, beforeEach } from "vitest"

function getDiceCollection() {
  return [getDiceSet()]
}

function getDiceSet(diceSet?: Partial<DiceSet>): DiceSet {
  return {
    name: "Calabozos Y Dragones",
    dice: [
      { type: { faces: 20, name: "D20" }, count: 1 },
      { type: { faces: 12, name: "D12" }, count: 1 },
      { type: { faces: 10, name: "D10" }, count: 1 },
      { type: { faces: 8, name: "D8" }, count: 1 },
      { type: { faces: 6, name: "D6" }, count: 1 },
      { type: { faces: 4, name: "D4" }, count: 1 },
    ],
    ...diceSet,
  }
}

let diceSetCollection: DiceSet[]
beforeEach(() => {
  diceSetCollection = getDiceCollection()
})

describe("validateNewDiceSet", () => {
  it("passes when proper name", () => {
    const newSet = getDiceSet({ name: "Generala" })
    console.log({ newSet })

    const validationErrors = validateNewDiceSet(newSet, diceSetCollection)
    expect(validationErrors).not.toBeNull()
    expect(validationErrors.length).toBe(0)
  })

  it("fails when name is duplicated", () => {
    const newSet = getDiceSet({ name: getDiceSet().name, dice: [] })
    const validationErrors = validateNewDiceSet(newSet, diceSetCollection)
    expect(validationErrors).not.toBeNull()
    expect(validationErrors.length).toBe(1)
    expect(validationErrors[0]).toBe(ErrorCode.DupeName)
  })
})
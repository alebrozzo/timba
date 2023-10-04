import { describe, it, expect, beforeEach } from "vitest"
import { addDieType, deleteDieType, getDefaultDie } from "$lib/diceUtils"
import type { DiceSet } from "$lib/types"

function getDiceCollection() {
  return [getDiceSet()]
}

function getDiceSet(diceSet?: Partial<DiceSet>): DiceSet {
  return {
    id: "123",
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

describe("getDefaultDie", () => {
  it("returns a valid die", () => {
    const newDie = getDefaultDie()
    expect(newDie).toBeTruthy()
    expect(newDie.faces).toBeGreaterThan(0)
  })
})

describe("addDieType", () => {
  it("returns a new set with the new die", () => {
    const set = diceSetCollection[0]
    const newSet = addDieType(set)
    expect(newSet).not.toBe(set)
    expect(newSet.dice.length).toBe(set.dice.length + 1)
  })
})

describe("deleteDieType", () => {
  it("returns a new set with the new die", () => {
    const dieTypeName = "happy"
    const die = getDefaultDie()
    die.name = dieTypeName
    const set = diceSetCollection[0]
    set.dice.push({ type: die, count: 3 })

    const newSet = deleteDieType(set, die)
    expect(newSet).not.toBe(set)
    expect(newSet.dice.length).toBe(set.dice.length - 1)
    expect(newSet.dice.find((x) => x.type.name === dieTypeName)).toBeUndefined()
  })
})

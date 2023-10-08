import { describe, it, expect, beforeEach } from "vitest"
import { addDieType, deleteDieType, getDefaultDie, getDiceSetBySlug } from "$lib/diceUtils"
import type { DiceSet } from "$lib/types"
import { getDiceCollection } from "../../testUtils"

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
    set.dice.push(die)

    const newSet = deleteDieType(set, die)
    expect(newSet).not.toBe(set)
    expect(newSet.dice.length).toBe(set.dice.length - 1)
    expect(newSet.dice.find((x) => x.name === dieTypeName)).toBeUndefined()
  })
})

describe("getDiceSetBySlug", () => {
  it("returns a set when it exists", () => {
    const set = diceSetCollection[0]
    const newSet = getDiceSetBySlug(diceSetCollection, set.slug)
    expect(newSet).toBe(set)
  })

  it("returns null when it does not exist", () => {
    const newSet = getDiceSetBySlug(diceSetCollection, "not-a-valid-slug")
    expect(newSet).toBeNull()
  })

  it("returns the first set when it exists twice", () => {
    const set = diceSetCollection[0]
    diceSetCollection.push({ ...set, id: "456" })
    const newSet = getDiceSetBySlug(diceSetCollection, set.slug)
    expect(newSet).toBe(set)
  })
})

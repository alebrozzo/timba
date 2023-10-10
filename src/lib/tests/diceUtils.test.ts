import { describe, it, expect, beforeEach } from "vitest"
import { getDefaultDie, getDiceSetBySlug } from "$lib/diceUtils"
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

describe("getDiceSetBySlug", () => {
  it("returns a set when it exists", () => {
    const set = diceSetCollection[0]
    const newSet = getDiceSetBySlug(diceSetCollection, set.slug)
    expect(newSet).toBe(set)
  })

  it("returns a set when received id instead of slug", () => {
    const set = diceSetCollection[0]
    const newSet = getDiceSetBySlug(diceSetCollection, set.id)
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

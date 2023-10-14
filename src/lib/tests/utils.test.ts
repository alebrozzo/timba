import { describe, it, expect, beforeEach } from "vitest"
import { getEmptyTimba, getNewSet, getRandomNumber, getSlug } from "$lib/utils"
import { getDiceCollection } from "../../testUtils"
import type { DiceSet } from "../types"

let diceSetCollection: DiceSet[]
beforeEach(() => {
  diceSetCollection = getDiceCollection()
})

describe("getEmptyTimba", () => {
  it("returns an object", () => {
    const allTimba = getEmptyTimba()
    expect(allTimba).toBeTruthy()
    expect(allTimba.diceSets).toBeTruthy()
    expect(allTimba.cardSet).toBeTruthy()
    expect(allTimba.numberSet).toBeTruthy()
  })
})

describe("getSlug", () => {
  it("returns slug in lower case and with no special chars", () => {
    expect(getSlug("Spaces 2 Casing!")).toBe("spaces-2-casing")
  })
})

describe("getNewSet", () => {
  it("returns an object with no ID", () => {
    const newSet = getNewSet()
    expect(newSet).toBeTruthy()
    expect(newSet.id).toBeFalsy()
  })
})

describe("getRandomNumber", () => {
  it("returns a number between 1 and 6", () => {
    const randomNumber = getRandomNumber(6)
    expect(randomNumber).toBeGreaterThanOrEqual(1)
    expect(randomNumber).toBeLessThanOrEqual(6)
  })

  it("returns a number between 1 and 3", () => {
    const randomNumber = getRandomNumber(1, 3)
    expect(randomNumber).toBeGreaterThanOrEqual(1)
    expect(randomNumber).toBeLessThanOrEqual(3)
  })

  it("returns 1", () => {
    const randomNumber = getRandomNumber(1)
    expect(randomNumber).toBe(1)
  })

  it("returns same value if min and max are the same", () => {
    const randomNumber = getRandomNumber(4, 4)
    expect(randomNumber).toBe(4)
  })
})

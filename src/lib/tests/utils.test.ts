import { describe, it, expect, beforeEach } from "vitest"
import { ErrorCode, type DiceSet } from "$lib/types"
import { getEmptyTimba, getNewSet, getRandomNumber, getSlug, validateNewDiceSet } from "$lib/utils"
import { getDiceCollection, getDiceSet } from "../../testUtils"

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

describe("validateNewDiceSet", () => {
  it("passes when proper name", () => {
    const newSet = getDiceSet({ name: "Generala" })
    const validationErrors = validateNewDiceSet(newSet, diceSetCollection)
    expect(validationErrors).not.toBeNull()
    expect(validationErrors.length).toBe(0)
  })

  it("fails when name is empty", () => {
    const newSet = getDiceSet({ name: "" })
    const validationErrors = validateNewDiceSet(newSet, diceSetCollection)
    expect(validationErrors).not.toBeNull()
    expect(validationErrors.length).toBe(1)
    expect(validationErrors[0]).toBe(ErrorCode.NoName)
  })

  it("fails when name is duplicated", () => {
    const newSet = getDiceSet({ id: "555", name: getDiceSet().name })
    const validationErrors = validateNewDiceSet(newSet, diceSetCollection)

    expect(validationErrors).not.toBeNull()
    expect(validationErrors.length).toBe(1)
    expect(validationErrors[0]).toBe(ErrorCode.DupeName)
  })

  it("fails when no dice", () => {
    const newSet = getDiceSet({ name: "Test", dice: [] })
    const validationErrors = validateNewDiceSet(newSet, diceSetCollection)

    expect(validationErrors).not.toBeNull()
    expect(validationErrors.length).toBe(1)
    expect(validationErrors[0]).toBe(ErrorCode.NoDice)
  })

  it("returns more than one error", () => {
    const newSet = getDiceSet({ name: "", dice: [] })
    const validationErrors = validateNewDiceSet(newSet, diceSetCollection)
    expect(validationErrors).not.toBeNull()
    expect(validationErrors.length).toBeGreaterThan(1)
    expect(validationErrors.includes(ErrorCode.NoName)).toBe(true)
    expect(validationErrors.includes(ErrorCode.NoDice)).toBe(true)
  })
})

describe("getSlug", () => {
  it("returns slug in lower case and with no special chars", () => {
    expect(getSlug("Spaces 2 Casing!")).toBe("spaces-2-casing")
  })
})

describe("getNewSet", () => {
  it("returns an object with an ID", () => {
    const newSet = getNewSet()
    expect(newSet.id).toBeTruthy()
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

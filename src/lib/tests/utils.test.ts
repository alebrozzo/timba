import { describe, it, expect, beforeEach } from "vitest"
import { ErrorCode, type DiceSet } from "$lib/types"
import { getNewSet, getSlug, validateNewDiceSet } from "$lib/utils"

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
    console.log({ newSet })

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

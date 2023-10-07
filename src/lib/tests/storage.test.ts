import { beforeEach, describe, expect, it } from "vitest"
import { deleteDiceSet, getAllTimba, getDiceSetBySlug, getEmptyTimba, saveAllTimba, saveDiceSet } from "$lib/storage"
import { ErrorCode, type DiceSet } from "$lib/types"
import { getDiceCollection } from "../../testUtils"

let diceSetCollection: DiceSet[]
beforeEach(() => {
  diceSetCollection = getDiceCollection()
  saveAllTimba(getEmptyTimba())
})

describe("getAllTimba", () => {
  it("returns an object", () => {
    const allTimba = getAllTimba()
    expect(allTimba).toBeTruthy()
  })

  it("returns an object even if no data", () => {
    localStorage.clear()
    const allTimba = getAllTimba()
    expect(allTimba).toBeTruthy()
    expect(allTimba.diceSets?.length).toBe(0)
  })
})

describe("saveAllTimba", () => {
  it("saves data", () => {
    const diceSetName = "dice 1"
    const cardSetName = "cards 1"
    const numbersSetName = "numbers 1"
    const allTimba = getAllTimba()
    allTimba.diceSets = diceSetCollection
    allTimba.diceSets[0].name = diceSetName
    allTimba.cardSet.push({ name: cardSetName, id: "card1", slug: "card1" })
    allTimba.numberSet.push({ name: numbersSetName, id: "number1", slug: "number1" })

    saveAllTimba(allTimba)

    const savedTimba = getAllTimba()
    expect(savedTimba.diceSets[0].name).toBe(diceSetName)
    expect(savedTimba.cardSet[0].name).toBe(cardSetName)
    expect(savedTimba.numberSet[0].name).toBe(numbersSetName)
  })
})

describe("saveDiceSet", () => {
  it("saves data - insert", () => {
    const diceSetName = "Set #1"
    const allTimba = getAllTimba()
    allTimba.diceSets = diceSetCollection
    allTimba.diceSets[0].name = diceSetName

    const errors = saveDiceSet(allTimba.diceSets[0])
    expect(errors.length).toBe(0)

    const savedTimba = getAllTimba()
    expect(savedTimba.diceSets[0].name).toBe(diceSetName)
  })

  it("saves data - insert no id", () => {
    const diceSetName = "Set #1"
    const allTimba = getAllTimba()
    allTimba.diceSets = diceSetCollection
    allTimba.diceSets[0].id = ""
    allTimba.diceSets[0].name = diceSetName

    const errors = saveDiceSet(allTimba.diceSets[0])
    expect(errors.length).toBe(0)

    const savedTimba = getAllTimba()
    expect(savedTimba.diceSets[0].name).toBe(diceSetName)
  })

  it("saves data - update", () => {
    const diceSetNewName = "New Name"
    const allTimba = getAllTimba()
    allTimba.diceSets = diceSetCollection
    allTimba.diceSets[0].name = "Original Name"
    saveDiceSet(allTimba.diceSets[0])

    allTimba.diceSets[0].name = diceSetNewName
    const errors = saveDiceSet(allTimba.diceSets[0])
    expect(errors.length).toBe(0)

    const savedTimba = getAllTimba()
    expect(savedTimba.diceSets[0].name).toBe(diceSetNewName)
  })

  it("gets name validation errors", () => {
    const allTimba = getAllTimba()
    allTimba.diceSets = diceSetCollection
    allTimba.diceSets[0].name = ""

    const errors = saveDiceSet(allTimba.diceSets[0])
    expect(errors.length).toBe(1)
    expect(errors[0]).toBe(ErrorCode.NoName)

    const savedTimba = getAllTimba()
    expect(savedTimba.diceSets.length).toBe(0)
  })
})

describe("getDiceSetBySlug", () => {
  it("retrieves data", () => {
    const diceSetName = "Set #1"
    const allTimba = getAllTimba()
    allTimba.diceSets = diceSetCollection
    allTimba.diceSets[0].name = diceSetName
    saveAllTimba(allTimba)

    const savedDiceSet = getDiceSetBySlug("set-1")
    expect(savedDiceSet?.name).toBe(diceSetName)
  })

  it("retrieves data if twice", () => {
    const diceSetName = "Set #1"
    const allTimba = getAllTimba()
    allTimba.diceSets = diceSetCollection
    allTimba.diceSets[0].name = diceSetName
    allTimba.diceSets.push({ ...allTimba.diceSets[0] })
    allTimba.diceSets[1].name = "Set !1"
    saveAllTimba(allTimba)

    const savedDiceSet = getDiceSetBySlug("set-1")
    expect(savedDiceSet?.name).toBe(diceSetName)
  })

  it("returns null if not exist", () => {
    const allTimba = getAllTimba()
    allTimba.diceSets = diceSetCollection
    saveAllTimba(allTimba)

    const savedDiceSet = getDiceSetBySlug("set-1")
    expect(savedDiceSet).toBe(null)
  })
})

describe("deleteDiceSet", () => {
  it("deletes data", () => {
    const idToDelete = "abcXYZ"
    let allTimba = getAllTimba()
    allTimba.diceSets = diceSetCollection
    allTimba.diceSets[0].name = "Set #1"
    allTimba.diceSets.push({ ...allTimba.diceSets[0], id: idToDelete })
    allTimba.diceSets[1].name = "Set #2"
    saveAllTimba(allTimba)
    allTimba = getAllTimba()
    expect(allTimba.diceSets.length).toBe(2)
    expect(allTimba.diceSets.find((x) => x.id === idToDelete)).toBeTruthy()

    deleteDiceSet(idToDelete)
    allTimba = getAllTimba()
    expect(allTimba.diceSets.length).toBe(1)
    expect(allTimba.diceSets.find((x) => x.id === idToDelete)).toBeUndefined()
  })

  it("does not throw if not existing", () => {
    let allTimba = getAllTimba()
    allTimba.diceSets = diceSetCollection
    allTimba.diceSets[0].name = "Set #1"
    saveAllTimba(allTimba)
    allTimba = getAllTimba()

    deleteDiceSet("non-existent-id")
    allTimba = getAllTimba()
    expect(allTimba.diceSets.length).toBe(1)
  })
})

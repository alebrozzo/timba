import { describe, expect, it } from "vitest"
import { rollDice } from "$lib/diceLogic"
import type { DiceSet } from "$lib/types"

function getTestDiceSet(): DiceSet {
  return {
    id: "123",
    name: "Test Set",
    slug: "test-set",
    dice: [
      { faces: 20, name: "D20", count: 1, id: "1" },
      { faces: 12, name: "D12", count: 5, id: "2" },
      { faces: 4, name: "D4", count: 4, id: "3" },
      { faces: 1, name: "D1", count: 1, id: "4" },
    ],
  }
}

describe("rollDice", () => {
  it("returns expected dice results count", () => {
    const diceSet = getTestDiceSet()
    const roll = rollDice(diceSet)

    expect(roll.length).toBe(diceSet.dice.length)
    for (let dieTypeIndex = 0; dieTypeIndex < diceSet.dice.length; dieTypeIndex++) {
      const diceOfType = diceSet.dice[dieTypeIndex]

      // verify that we got the correct number of results for this die type
      expect(roll[dieTypeIndex].dieType.id).toBe(diceOfType.id)
      expect(roll[dieTypeIndex].results.length).toBe(diceOfType.count)

      // verify that each result is within the expected range (faces)
      for (let dieIndex = 0; dieIndex < diceOfType.count; dieIndex++) {
        const dieResult = roll[dieTypeIndex].results[dieIndex]
        expect(dieResult.rolledValue).toBeGreaterThanOrEqual(1)
        expect(dieResult.rolledValue).toBeLessThanOrEqual(diceOfType.faces)
      }
    }
  })
})

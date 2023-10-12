import type { DiceSet, DieType } from "./types"
import { getRandomNumber } from "./utils"

export type RollResult = {
  dieType: DieType
  results: DieResult[]
}

export type DieResult = {
  dieIndex: number
  rolledValue: number
}

export function rollDice(set: DiceSet): RollResult[] {
  const rollResults: RollResult[] = []
  for (const dieType of set.dice) {
    const dieTypeResults: DieResult[] = []
    for (let i = 0; i < dieType.count; i++) {
      const rolledValue = getRandomNumber(dieType.faces)
      dieTypeResults.push({
        dieIndex: i + 1,
        rolledValue,
      })
    }
    rollResults.push({
      dieType: dieType,
      results: dieTypeResults,
    })
  }
  return rollResults
}

export function validateDie(dieType: DieType): string[] {
  const errors: string[] = []
  if (!dieType.faces || dieType.faces < 1 || !Number.isInteger(dieType.faces)) {
    errors.push("Faces must be a positive integer")
  }
  if (!dieType.count || dieType.count < 1 || !Number.isInteger(dieType.count)) {
    errors.push("Count must be a positive integer")
  }

  return errors
}

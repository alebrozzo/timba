import { saveNewDiceSet } from "$lib/storage"
import type { DiceSet, Die, ErrorCode } from "$lib/types"

export function getDefaultDie(): Die {
  return { faces: 6 }
}

export function addDieType(set: DiceSet): DiceSet {
  return { ...set, dice: [...set.dice, { count: 1, type: { ...getDefaultDie() } }] }
}

export function deleteDieType(set: DiceSet, die: Die): DiceSet {
  return { ...set, dice: set.dice.filter((x) => x.type !== die) }
}

export function saveDiceSet(set: DiceSet): ErrorCode[] {
  return saveNewDiceSet(set)
}

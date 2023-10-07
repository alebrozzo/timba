import type { DiceSet, DieType } from "$lib/types"

export function getDefaultDie(): DieType {
  return { faces: 6, count: 1 }
}

export function addDieType(set: DiceSet): DiceSet {
  return { ...set, dice: [...set.dice, getDefaultDie()] }
}

export function deleteDieType(set: DiceSet, die: DieType): DiceSet {
  return { ...set, dice: set.dice.filter((x) => x.id !== die.id) }
}

export const DICE_EDIT_MODE_CHANGE_EVENT = "DiceEditModeChanged"
export const DICE_SET_DELETE_EVENT = "DiceSetDeleted"

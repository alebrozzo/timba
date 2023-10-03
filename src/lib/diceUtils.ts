import type { DiceSet, Die } from "$lib/types"

export function getDefaultDie(): Die {
  return { faces: 6 }
}

export function addDieType(set: DiceSet): DiceSet {
  return { ...set, dice: [...set.dice, { count: 1, type: { ...getDefaultDie() } }] }
}

export function deleteDieType(set: DiceSet, die: Die): DiceSet {
  return { ...set, dice: set.dice.filter((x) => x.type !== die) }
}

export const DICE_EDIT_MODE_CHANGE_EVENT = "DiceEditModeChanged"
export const DICE_SET_DELETE_EVENT = "DiceSetDeleted"

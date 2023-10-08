import type { DiceSet, DieType } from "$lib/types"

export function getDefaultDie(): DieType {
  return { faces: 6, count: 1 }
}

export function addDieType(set: DiceSet): DiceSet {
  return { ...set, dice: [...set.dice, getDefaultDie()] }
}

export function deleteDieType(set: DiceSet, die: DieType): DiceSet {
  //return { ...set, dice: set.dice.filter((x) => x.id !== die.id) }
  return { ...set, dice: set.dice.filter((x) => x !== die) }
}

export function getDiceSetBySlug(sets: DiceSet[], slug: DiceSet["slug"]): DiceSet | null {
  const set = sets.filter((x) => x.slug === slug)
  if (set.length === 0) {
    console.warn(slug + " did not exist in the database")
    return null
  }

  if (set.length > 1) {
    console.warn(slug + " exists twice in the database")
  }

  return set[0]
}

export const DICE_EDIT_MODE_CHANGE_EVENT = "DiceEditModeChanged"
export const DICE_SET_DELETE_EVENT = "DiceSetDeleted"

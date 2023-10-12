import type { DiceSet, DieType } from "$lib/types"

export function getDefaultDie(): DieType {
  return { faces: 6, count: 1 }
}

export function getDiceSetBySlug(sets: DiceSet[], slug: DiceSet["slug"] | DiceSet["id"]): DiceSet | null {
  const set = sets.filter((x) => x.slug === slug)
  if (set.length === 0) {
    const setById = sets.filter((x) => x.id === slug)
    if (setById.length > 0) {
      return setById[0]
    }
    console.warn(slug + " did not exist in the database")
    return null
  }

  if (set.length > 1) {
    console.warn(slug + " exists twice in the database")
  }

  return set[0]
}

export const DICE_SET_START_EDIT_EVENT = "DiceSetStartEdit"
export const DICE_SET_DIE_TYPE_ADD_EVENT = "DiceSetDieTypeAdd"
export const DICE_SET_DIE_TYPE_EDIT_EVENT = "DiceSetDieTypeEdit"
export const DICE_SET_DIE_TYPE_SAVE_EVENT = "DiceSetDieTypeSave"
export const DICE_SET_DIE_TYPE_DELETE_EVENT = "DiceSetDieTypeDelete"
export const DICE_SET_CANCEL_EDIT_EVENT = "DiceSetCancelEdit"
export const DICE_SET_SAVE_EDIT_EVENT = "DiceSetSaveEdit"
export const DICE_SET_DELETE_EVENT = "DiceSetDeleted"

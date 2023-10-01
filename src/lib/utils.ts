import slugify from "slugify"
import { ErrorCode, type DiceSet } from "./types"

//TODO: remove sets and use get
export function validateNewDiceSet(set: DiceSet, sets: DiceSet[]): ErrorCode[] {
  const errors: ErrorCode[] = []

  const hasName = set.name?.length > 0
  if (!hasName) {
    errors.push(ErrorCode.NoName)
  } else {
    const isNameValid = validateNameUnique(
      set.name,
      sets.map((x) => x.name)
    )
    if (!isNameValid) {
      errors.push(ErrorCode.DupeName)
    }
  }

  const hasDice = set.dice.length > 0
  if (!hasDice) {
    errors.push(ErrorCode.NoDice)
  }

  return errors
}

function validateNameUnique(name: string, names: string[]) {
  return !names.includes(name)
}

export function getSlug(value: string) {
  return slugify(value, { lower: true })
}

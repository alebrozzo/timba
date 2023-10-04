import slugify from "slugify"
import { getDefaultDie } from "./diceUtils"
import { ErrorCode, type DiceSet } from "./types"

//TODO: remove "sets" as input parameter and use get endpoint
export function validateNewDiceSet(set: DiceSet, sets: DiceSet[]): ErrorCode[] {
  const errors: ErrorCode[] = []

  const hasName = set.name?.length > 0
  if (!hasName) {
    errors.push(ErrorCode.NoName)
  } else {
    const otherSetsNames = sets.filter((x) => x.id !== set.id).map((x) => x.name)
    const isNameValid = validateNameUnique(set.name, otherSetsNames)

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

function validateNameUnique(name: DiceSet["name"], names: DiceSet["name"][]) {
  return !names.includes(name)
}

export function getSlug(value: string) {
  return slugify(value, { lower: true, strict: true })
}

export function getNewSet(): DiceSet {
  const id = crypto.randomUUID()
  return { id, name: "", dice: [{ type: { ...getDefaultDie() }, count: 1 }] }
}

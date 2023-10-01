import type { DiceSet, ErrorCode } from "./types"

export function validateNewDiceSet(set: DiceSet, sets: DiceSet[]): ErrorCode[] {
  const errors: ErrorCode[] = []
  const isNameValid = validateNameUnique(
    set.name,
    sets.map((x) => x.name)
  )
  if (!isNameValid) {
    errors.push("DupeName")
  }

  return errors
}

function validateNameUnique(name: string, names: string[]) {
  return names.includes(name)
}

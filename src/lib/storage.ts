import type { DiceSet, ErrorCode, Timba } from "./types"
import { getSlug, validateNewDiceSet } from "./utils"

const TIMBA_STORAGE = "TimbaData"

export function getEmptyTimba(): Timba {
  return {
    diceSets: [],
    cardSet: [],
    numberSet: [],
  }
}

export function getAllTimba(): Timba {
  let timba: Timba = getEmptyTimba()
  const timbaStr = localStorage.getItem(TIMBA_STORAGE) ?? ""
  if (!timbaStr) {
    return timba
  }

  try {
    timba = JSON.parse(timbaStr)
  } catch (error) {
    console.warn(TIMBA_STORAGE + " is not valid")
  }

  return timba
}

export function saveAllTimba(timba: Timba) {
  const safeTimba = { ...getEmptyTimba(), ...timba }
  localStorage.setItem(TIMBA_STORAGE, JSON.stringify(safeTimba))
}

export function saveDiceSet(diceSet: DiceSet): ErrorCode[] {
  const timba = getAllTimba()

  const errors = validateNewDiceSet(diceSet, timba.diceSets)
  if (errors.length > 0) {
    console.error("Errors", errors)
    return errors
  }

  if (!diceSet.id) {
    console.error("shouldn't have come here - no ID", { diceSet })

    diceSet.id = crypto.randomUUID()
    timba.diceSets.push(diceSet)
  } else {
    const updatedSet = timba.diceSets.find((x) => x.id === diceSet.id)
    if (!updatedSet) {
      // should be an insert
      timba.diceSets.push(diceSet)
    } else {
      // should be an update
      Object.assign(updatedSet, diceSet)
    }
  }

  saveAllTimba(timba)
  return errors
}

export function getDiceSetBySlug(diceSetSlug: string) {
  const timba = getAllTimba()
  const set = timba.diceSets.filter((x) => getSlug(x.name) === diceSetSlug)
  if (set.length === 0) {
    console.warn(diceSetSlug + " did not exist in the database")
  }

  if (set.length > 1) {
    console.warn(diceSetSlug + " exists twice in the database")
  }

  return set[0]
}

export function deleteDiceSet(setId: DiceSet["id"]) {
  const timba = getAllTimba()
  const originalCount = timba.diceSets.length
  timba.diceSets = [...timba.diceSets.filter((x) => x.id !== setId)]
  if (originalCount === timba.diceSets.length) {
    console.warn(setId + " did not exist in the database")
  }

  saveAllTimba(timba)
}

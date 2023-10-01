import type { DiceSet, Timba } from "./types"
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

export function saveNewDiceSet(diceSet: DiceSet) {
  const timba = getAllTimba()

  const errors = validateNewDiceSet(diceSet, timba.diceSets)
  if (errors.length > 0) {
    console.error("Errors", errors)
    return
  }

  timba.diceSets = [...timba.diceSets, diceSet]
  saveAllTimba(timba)
}

export function getDiceSet(diceSetSlug: string) {
  const timba = getAllTimba()
  const set = timba.diceSets.filter((x) => getSlug(x.name) === diceSetSlug)
  if (set.length === 0) {
    console.warn(diceSetSlug + " did not exist in the database")
  }

  return set[0]
}

export function deleteDiceSet(diceSetName: string) {
  const timba = getAllTimba()
  const originalCount = timba.diceSets.length
  timba.diceSets = [...timba.diceSets.filter((x) => x.name !== diceSetName)]
  if (originalCount === timba.diceSets.length) {
    console.warn(diceSetName + " did not exist in the database")
  }

  saveAllTimba(timba)
}

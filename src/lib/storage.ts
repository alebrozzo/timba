import type { DiceSet, Timba } from "./types"

const TIMBA_STORAGE = "TimbaData"

export function getEmptyTimba(): Timba {
  return {
    diceSets: [],
    cardSet: [],
    numberSet: [],
  }
}

export const getAllTimba = (): Timba => {
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

export const saveAllTimba = (timba: Timba) => {
  const safeTimba = { ...getEmptyTimba(), ...timba }
  localStorage.setItem(TIMBA_STORAGE, JSON.stringify(safeTimba))
}

export const saveNewDiceSet = (diceSet: DiceSet) => {
  const timba = getAllTimba()
  // TODO: validate name is not repeated
  timba.diceSets = [...timba.diceSets, diceSet]
  saveAllTimba(timba)
}

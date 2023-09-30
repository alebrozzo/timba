import type { Timba } from "./types"

const TIMBA_STORAGE = "TimbaData"

const emptyTimba: Timba = {
  diceSets: [],
  cardSet: [],
  numberSet: [],
}

export const getAllTimba = (): Timba => {
  const timbaStr = localStorage.getItem(TIMBA_STORAGE) ?? ""
  const timba = JSON.parse(timbaStr)
  return timba ?? emptyTimba
}

export const saveAllTimba = (timba: Timba) => {
  localStorage.setItem(TIMBA_STORAGE, JSON.stringify(timba))
}

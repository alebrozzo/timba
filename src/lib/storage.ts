import type { Timba } from "./types"

const emptyTimba: Timba = {
  diceSets: [],
  cardSet: [],
  numberSet: [],
}

export const getAllTimba = (): Timba => {
  const timbaStr = localStorage.getItem("TimbaData") ?? ""
  const timba = JSON.parse(timbaStr)
  return timba ?? emptyTimba
}

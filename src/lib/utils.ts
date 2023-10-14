import slugify from "slugify"
import { getDefaultDie } from "./diceUtils"
import type { DiceSet, Timba } from "./types"

export function getEmptyTimba(): Timba {
  return {
    diceSets: [],
    cardSet: [],
    numberSet: [],
  }
}

export function getSlug(value: string) {
  return slugify(value, { lower: true, strict: true })
}

export function getNewSet(): DiceSet {
  return { name: "", slug: "", dice: [getDefaultDie()] }
}

export function getRandomNumber(max: number): number
export function getRandomNumber(min: number, max: number): number
export function getRandomNumber(min: number, max?: number): number {
  if (max === undefined) {
    max = min
    min = 1
  }
  return Math.floor(Math.random() * (max - min + 1)) + min
}

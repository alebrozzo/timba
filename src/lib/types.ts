export type Timba = {
  diceSets: DiceSet[]
  cardSet: TimbaSet[] // TODO
  numberSet: TimbaSet[]
}

export type DieType = {
  id?: string
  count: number
  faces: number
  name: string
}

export type TimbaSet = {
  id?: string
  name: string
  slug: string
}

export type DiceSet = TimbaSet & {
  dice: DieType[]
}

export enum ErrorCode {
  "NoName",
  "DupeName",
  "NoDice",
  "Other",
}

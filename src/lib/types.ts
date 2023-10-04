export type Timba = {
  diceSets: DiceSet[]
  cardSet: TimbaSet[] // TODO
  numberSet: TimbaSet[]
}

export type Die = {
  faces: number
  name?: string
}

export type TimbaSet = {
  id: string
  name: string
}

export type DiceSet = TimbaSet & {
  dice: {
    type: Die
    count: number
  }[]
}

export enum ErrorCode {
  "NoName",
  "DupeName",
  "NoDice",
  "Other",
}

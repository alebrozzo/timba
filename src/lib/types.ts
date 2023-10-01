export type Timba = {
  diceSets: DiceSet[]
  cardSet: []
  numberSet: []
}

export type Die = {
  faces: number
  name?: string
}

export type DiceSet = {
  name: string
  dice: {
    type: Die
    count: number
  }[]
}

export enum ErrorCode {
  "DupeName",
  "Other",
}

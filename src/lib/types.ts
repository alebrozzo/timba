export type Timba = {
  diceSets: DiceSet[]
  cardSet: []
  numberSet: []
}

export type Die = {
  faces: number
  name: string | null
}

export type DiceSet = [
  {
    type: Die
    count: number
  }
]

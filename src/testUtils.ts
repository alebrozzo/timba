import type { DiceSet } from "./types"

export function getDiceCollection() {
  return [getDiceSet()]
}

export function getDiceSet(diceSet?: Partial<DiceSet>): DiceSet {
  return {
    id: "123",
    name: "Calabozos Y Dragones",
    dice: [
      { type: { faces: 20, name: "D20" }, count: 1 },
      { type: { faces: 12, name: "D12" }, count: 1 },
      { type: { faces: 10, name: "D10" }, count: 1 },
      { type: { faces: 8, name: "D8" }, count: 1 },
      { type: { faces: 6, name: "D6" }, count: 1 },
      { type: { faces: 4, name: "D4" }, count: 1 },
    ],
    ...diceSet,
  }
}

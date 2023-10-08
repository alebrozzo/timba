import type { DiceSet } from "$lib/types"

export function getDiceCollection() {
  return [getDiceSet()]
}

export function getDiceSet(diceSet?: Partial<DiceSet>): DiceSet {
  return {
    id: "123",
    name: "Calabozos Y Dragones",
    slug: "calabozos-y-dragones",
    dice: [
      { faces: 20, name: "D20", count: 1 },
      { faces: 12, name: "D12", count: 1 },
      { faces: 10, name: "D10", count: 1 },
      { faces: 8, name: "D8", count: 1 },
      { faces: 6, name: "D6", count: 1 },
      { faces: 4, name: "D4", count: 1 },
    ],
    ...diceSet,
  }
}

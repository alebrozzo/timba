import type { DiceSet, DieRollResult } from "$lib/types"
import type { Score } from "../types"

export type OnDiceSelectionCompletedParams = {
  selectedDice: DiceSet[]
  currentRollScore: Score
}

export type OnTurnCompletedParams = {
  currentTotalScore: Score
  currentTurnScore: Score
}

export type SelectableDice = DieRollResult[]

export type GameRules = {
  gameName: string
  onRollCompleted: (rolledDice: DieRollResult[]) => Score | SelectableDice
  onDiceSelectionCompleted: (params: OnDiceSelectionCompletedParams) => Score
  onTurnCompleted: (params: OnTurnCompletedParams) => Score
}

export const gameRules: GameRules = {
  gameName: "10000",
  onRollCompleted,
  onDiceSelectionCompleted,
  onTurnCompleted,
}

export function onRollCompleted(rolledDice: DieRollResult[]): SelectableDice {
  // if any of the dice are 1 or 5, then the player can select them
  // if three or more of a kind, then the player can select them
  const selectableDice: SelectableDice = []
  const diceByValue = rolledDice.reduce((acc, die) => {
    if (!acc[die.value]) {
      acc[die.value] = []
    }
    acc[die.value].push(die)
    return acc
  }, {} as Record<number, DieRollResult[]>)

  for (const [value, dice] of Object.entries(diceByValue)) {
    if (value === "1" || value === "5") {
      selectableDice.push(...dice)
    } else if (dice.length >= 3) {
      selectableDice.push(...dice)
    }
  }

  return selectableDice
}

export function onDiceSelectionCompleted(params: OnDiceSelectionCompletedParams): Score {
  const { selectedDice, currentRollScore } = params
  return { player: currentRollScore.player, score: currentRollScore.score + 1 }
}

export function onTurnCompleted(params: OnTurnCompletedParams): Score {
  const { currentTotalScore, currentTurnScore } = params
  const newTotalScore = {
    player: currentTotalScore.player,
    score: currentTotalScore.score + currentTurnScore.score,
  }
  return newTotalScore
}
